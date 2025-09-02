import { Query, QueryTable, JSONUpdateRequest, JSONDeleteRequest, JSONSelectRequest, JSONInsertRequest, ColumnsType } from "../utils/types";
import * as logger from "../utils/logger";
import { normalyzeKey } from "../utils/utils";



/**
 * Prepares an select query for execution
 * @param table The table to select from
 * @param jsonRequest Valid JSON object with the structure shown in the example
 * @returns The prepared query with the values
 * @example
 * {
 *     "keys": ["*"],
 *     "aggregation": undefined,
 *     "limit": n,
 *     "offset": n,
 *     "whereValues": [
 *         {
 *             "key": "x",
 *             "comparisonOperator": "x",
 *             "value": "x|n",
 *             "logicalOperator": "x"
 *         },
 *     ],
 *     "warnings": [
 *        "Description of the warnings -> action executed",
 *        ...
 *     ],
 *     "errors": [
 *        "Description of the error",
 *        ...
 *     ]
 * }
 */
export function getSelectQuery(table: QueryTable, jsonRequest: JSONSelectRequest): Query {
    try {
        let query = "SELECT";
        let values: (string|number|boolean|null)[] = [];

        /* Select */
        for (const index in jsonRequest.keys) {
            const key = normalyzeKey(jsonRequest.keys[index], table);
            query += jsonRequest.aggregation ? ` ${jsonRequest.aggregation}(` : " ";
            query += key;
            query += jsonRequest.aggregation ? `) AS ${jsonRequest.aggregation.toLowerCase()}_${key === "*" ? "all" : key},` : ",";
        }
        query = query.slice(0, -1); // Remove the last comma

        /* From */
        query += ` FROM ${table} `;

        /* Where */
        for (const index in jsonRequest.whereValues) {
            const whereObject        = jsonRequest.whereValues[index];
            const key                = normalyzeKey(whereObject.key, table);
            const comparisonOperator = whereObject.comparisonOperator || "=";
            const value              = whereObject.value;
            const logicalOperator    = whereObject.logicalOperator || "AND";

            query += parseInt(index) === 0 ? "WHERE" : "";

            query += ` ${key} ${comparisonOperator} $${values.length + 1} `;
            query += parseInt(index) !== jsonRequest.whereValues.length - 1 ? logicalOperator : "";
            values.push(comparisonOperator === "LIKE" ? `%${value}%` : value);
        }

        query += `LIMIT $${values.length + 1} OFFSET $${values.length + 2};`;
        values.push(jsonRequest.limit as number|null);
        values.push(jsonRequest.offset as number);

        logger.debug("Query : ", query);
        logger.debug("Values : ", values);
        return { text: query, values: values };
    } catch (err) {
        logger.error(err);
        logger.error("FAILED PREPARING SELECT QUERY");
        return { text: "", values: [] };
    }
}


/**
 * Prepares an insert query for execution
 * @param table The table to insert into
 * @param jsonRequest Valid JSON object with the structure shown in the example
 * @returns The prepared query with the values
 * @example
 * {
 *     "returnedKeys": [
 *         "*"
 *     ],
 *     "insertions": [
 *         {
 *             "key": "value",
 *             "key": "value",
 *             ...
 *         }
 *     ],
 *     "warnings": [
 *        "Description of the warnings -> action executed",
 *        ...
 *     ],
 *     "errors": [
 *        "Description of the error",
 *        ...
 *     ]
 * }
 */
export function getInsertQuery(table: QueryTable, jsonRequest: JSONInsertRequest): Query {
    try {
        let query = "";
        let values: (string|number|boolean|null)[] = [];

        const insertObject = jsonRequest.insertions[0];
        query += `INSERT INTO ${table} (`
        for (const key in insertObject) {
            query += `${normalyzeKey(key as ColumnsType, table)}, `;
        }
        query = query.slice(0, -2); // Remove the last comma and space

        query += ") VALUES (";
        for (const key in insertObject) {
            const value = insertObject[key];
            query += `$${values.length + 1}, `;
            values.push(value);
        }
        query = query.slice(0, -2); // Remove the last comma and space

        query += ") RETURNING ";
        for (const key in jsonRequest.returnedKeys) {
            let returnedKey = key;
            if (key !== "*") {
                returnedKey = normalyzeKey(key as ColumnsType, table) as ColumnsType;
            }
            query += `${returnedKey}, `;
        }
        query = query.slice(0, -2); // Remove the last comma and space
        query += ";";

        logger.debug("Query : ", query);
        logger.debug("Values : ", values);
        return { text: query, values: values };
    } catch (err) {
        logger.error(err);
        logger.error("FAILED PREPARING INSERT QUERY");
        return { text: "", values: [] };
    }
}


/**
 * Prepares an update query for execution
 * @param table The table to update
 * @param jsonRequest Valid JSON object with the structure shown in the example
 * @returns The prepared query with the values
 * @example
 * {
 *     "keysValues": {
 *         "key1": "value1",
 *         "key2": "value2",
 *         ...
 *     },
 *     "whereValues": [
 *         {
 *             "key": "x",
 *             "comparisonOperator": "x",
 *             "value": "x|n",
 *             "logicalOperator": "x"
 *         },
 *         ...
 *     ],
 *     "warnings": [
 *        "Description of the warnings -> action executed",
 *        ...
 *     ],
 *     "errors": [
 *        "Description of the error",
 *        ...
 *     ]
 * }
 */
export function getUpdateQuery(table: QueryTable, jsonRequest: JSONUpdateRequest): Query {
    try {
        let query = `UPDATE ${table} SET `;
        let values: (string|number|boolean|null)[] = [];

        for (const key in jsonRequest.keysValues) {
            query += `${normalyzeKey(key as ColumnsType, table)}=$${values.length+1}, `;
            values.push(jsonRequest.keysValues[key]);
        }
        query = query.slice(0, -2); // Remove the last comma and space

        /* Where */
        for (const index in jsonRequest.whereValues) {
            const whereObject        = jsonRequest.whereValues[index];
            const key                = normalyzeKey(whereObject.key, table);
            const comparisonOperator = whereObject.comparisonOperator || "=";
            const value              = whereObject.value;
            const logicalOperator    = whereObject.logicalOperator || "AND";

            query += parseInt(index) === 0 ? " WHERE" : "";

            query += ` ${key} ${comparisonOperator} $${values.length + 1} `;
            query += parseInt(index) !== jsonRequest.whereValues.length - 1 ? logicalOperator : " RETURNING *;";
            values.push(comparisonOperator === "LIKE" ? `%${value}%` : value);
        }

        logger.debug("Query : ", query);
        logger.debug("Values : ", values);
        return { text: query, values: values };
    } catch (err) {
        logger.error(err);
        logger.error("FAILED PREPARING UPDATE QUERY");
        return { text: "", values: [] };
    }
}


/**
 * Prepares a delete query for execution
 * @param table The table to delete from
 * @param whereValues The values to delete
 * @returns The prepared query with the values
 * @example
 * {
 *     "whereValues": [
 *         {
 *             "key": "x",
 *             "comparisonOperator": "x",
 *             "value": "x|n",
 *             "logicalOperator": "x"
 *         },
 *         ...
 *     ],
 *     "warnings": [
 *        "Description of the warnings -> action executed",
 *        ...
 *     ],
 *     "errors": [
 *        "Description of the error",
 *        ...
 *     ]
 * }
 */
export function getDeleteQuery(table: QueryTable, jsonRequest: JSONDeleteRequest): Query {
    try {
        let query = `DELETE FROM ${table} WHERE 1=1 AND`;
        let values: (string|number|boolean|null)[] = [];

        /* Where */
        for (const index in jsonRequest.whereValues) {
            const whereObject        = jsonRequest.whereValues[index];
            const key                = normalyzeKey(whereObject.key, table);
            const comparisonOperator = whereObject.comparisonOperator || "=";
            const value              = whereObject.value;
            const logicalOperator    = whereObject.logicalOperator || "AND";

            query += ` ${key} ${comparisonOperator} $${values.length + 1} `;
            query += parseInt(index) !== jsonRequest.whereValues.length - 1 ? logicalOperator : "";
            values.push(comparisonOperator === "LIKE" ? `%${value}%` : value);
        }
        if (jsonRequest.whereValues.length === 0) { query += " 1=1"; }
        query += " RETURNING *;";

        logger.debug("Query : ", query);
        logger.debug("Values : ", values);
        return { text: query, values: values };
    } catch (err) {
        logger.error(err);
        logger.error("FAILED PREPARING DELETE QUERY");
        return { text: "", values: [] };
    }
}
