import { JSONDeleteRequest, OperationsType, QueryTable } from "../utils/types";
import * as logger from "../utils/logger";
import { Query } from "../utils/types";
import { normalyzeKey } from "../utils/utils";



/**
 * Prepares an select query for execution
 * @param table The table to select from
 * @param operations_id The ID of the operation to select
 * @param user_id The ID of the user performing the operation
 * @returns The prepared query with the values
 */
export function getSelectQuery(table: QueryTable, operations_id: number, user_id: number): Query {
    try {
        let query = `SELECT * FROM ${table} WHERE operations_id = $1 AND operations_userid = $2;`;
        let values: (string|number|boolean|null)[] = [operations_id, user_id];

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
 * @param operation The operation to insert
 * @param user_id The ID of the user performing the operation
 * @returns The prepared query with the values
 */
export function getInsertQuery(table: QueryTable, operation: OperationsType, user_id: number): Query {
    try {
        let query = "";
        let values: (string|number|boolean|null)[] = [];

        const keys = Object.keys(operation).filter(key => operation[key as keyof OperationsType] !== undefined && operation[key as keyof OperationsType] !== null && key !== "operations_id");
        if (keys.length > 0) {
            query = `INSERT INTO ${table} (${keys.join(", ")}, operations_userid) VALUES (${keys.map((_, index) => `$${index + 1}`).join(", ")}, $${keys.length + 1}) RETURNING *;`;
            values = keys.map(key => operation[key as keyof OperationsType]) as (string|number|boolean|null)[];
            values.push(user_id);
        }

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
 * @param operation The operation to update
 * @param user_id The ID of the user performing the operation
 * @returns The prepared query with the values
 */
export function getUpdateQuery(table: QueryTable, operation: any, user_id: number): Query {
    try {
        let query = `UPDATE ${table} SET `;
        let values: (string|number|boolean|null)[] = [];

        const keys = Object.keys(operation).filter(key => operation[key as keyof OperationsType] !== undefined && operation[key as keyof OperationsType] !== null && key !== "operations_id");
        if (keys.length > 0) {
            query += keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
            values = keys.map(key => operation[key as keyof OperationsType]) as (string|number|boolean|null)[];
            query += ` WHERE operations_id = $${keys.length + 1} AND operations_userid = $${keys.length + 2} RETURNING *;`;
            values.push(operation.operations_id);
            values.push(user_id);
        } else {
            query = "";
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
