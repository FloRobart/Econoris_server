import pg from 'pg';
import { Query, QueryTable, JSONUpdateRequest, JSONDeleteRequest, WhereValuesType, OperationsType, LoansType, TimetableType, JSONSelectRequest, JSONInsertRequest, ColumnsType } from "./types";
import { json } from 'node:stream/consumers';

const { Client } = pg;
let client: pg.Client;



/**
 * Connects the server to the database
 * @async
 * @param dburi The database URI
 * @example dburi = "postgresql://<user>:<password>@<host>:<port>/<db_name>"
 * @returns true if connected successfully, otherwise false
 */
export async function connectToDatabase(dburi: string|{host: string, user: string, password: string, port: number}): Promise<boolean> {
    try {
        client = new Client(dburi);
        await client.connect();

        client.on('error', (err) => {
            console.error(err);
            console.error("\n [❌] DATABASE ERROR")
        });

        client.on('end', () => {
            console.log("\n [✅️] DATABASE CONNECTION CLOSED")
        });

        return true;
    } catch (err) {
        console.error(err);
        console.error("\n [❌] FAILED CONNECTING TO DATABASE");
        return false;
    }
}


/**
 * Closes the database connection
 * @async
 * @returns void
 */
export async function closeDatabaseConnection(): Promise<void> {
    try {
        await client.end();
    }
    catch (err) {
        console.error(err);
        console.error("\n [❌] FAILED CLOSING DATABASE CONNECTION");
    }
}


/**
 * Executes a query on the database
 * @async
 * @param query The query to execute
 * @returns Array of rows returned by the query or an empty array if no rows are returned or an error occurs
 * @returns null if the query is not supported
 */
export async function executeQuery(query: Query): Promise<any[]|null> {
    try {
        const res = await client.query(query);
        return res.rows || [];
    } catch (err) {
        console.error(err);
        console.error("\n [❌] FAILED EXECUTING QUERY");
        return null;
    }
}


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

    return { text: query, values: values };
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
        let returnedKey = jsonRequest.returnedKeys[key];
        if (jsonRequest.returnedKeys[key] !== "*") {
            returnedKey = normalyzeKey(jsonRequest.returnedKeys[key], table) as ColumnsType;
        }
        query += `${returnedKey}, `;
    }
    query = query.slice(0, -2); // Remove the last comma and space
    query += ";";

    return { text: query, values: values };
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

    console.log("update query  :", query);
    console.log("update values :", values);
    return { text: query, values: values };
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
    let query = `DELETE FROM ${table} WHERE 1=1`;
    let values: (string|number|boolean|null)[] = [];

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

    console.log("delete query  :", query);
    console.log("delete values :", values);
    return { text: query, values: values };
}


/**
 * Normalizes the key by adding the prefix of the table if it is not already present
 * @param key The key to normalize
 * @param table The table to normalize the key for
 * @returns 
 */
function normalyzeKey(key: ColumnsType, table: QueryTable): string {
    if (key == "*") return key;
    return key.includes(`${table}_`) ? key : `${table}_${key}`;
}
