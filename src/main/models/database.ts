import pg from 'pg';
import { Query, QueryTable, WhereValuesType, OperationsType, LoansType, TimetableType, JSONRequest } from "./types";

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
 * 
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
export function getSelectQuery(table: QueryTable, jsonRequest: JSONRequest): Query {
    let query = "SELECT";
    let values: (string|number|boolean|null)[] = [];

    /* Select */
    for (const index in jsonRequest.keys) {
        const key = normalyzeKey(jsonRequest.keys[index], table);
        query += jsonRequest.aggregation ? ` ${jsonRequest.aggregation}(` : " ";
        query += key;
        query += jsonRequest.aggregation ? `) AS ${jsonRequest.aggregation}_${key},` : ",";
    }
    query = query.slice(0, -1); // Remove the last comma

    /* From */
    query += ` FROM ${table}`;

    /* Where */
    for (const index in jsonRequest.whereValues) {
        const whereObject        = jsonRequest.whereValues[index];
        const key                = normalyzeKey(whereObject.key, table);
        const comparisonOperator = whereObject.comparisonOperator || "=";
        const value              = whereObject.value;
        const logicalOperator    = whereObject.logicalOperator || "AND";

        query += parseInt(index) == 0 ? " WHERE" : "";

        query += ` ${key} ${comparisonOperator} $${values.length + 1} `;
        query += parseInt(index) != jsonRequest.whereValues.length - 1 ? logicalOperator : "";
        values.push(comparisonOperator == "LIKE" ? `%${value}%` : value);
    }

    query += `LIMIT $${values.length + 1} OFFSET $${values.length + 2};`;
    values.push(jsonRequest.limit as number|null);
    values.push(jsonRequest.offset as number);

    console.log("select query  :", query);
    console.log("select values :", values);
    return { text: query, values: values };
}


/**
 * Prepares an insert query for execution
 * @param table The table to insert into
 * @param insertValues The values to insert
 * @returns The prepared query with the values
 */
function prepareInsert(table: QueryTable, insertValues: WhereValuesType[]): Query {
    let query = `INSERT INTO ${table} (`;
    let values: (string|number|boolean|null)[] = [];
    const insertedKeys: string[] = [];

    for (const index in insertValues) {
        const insertObject = insertValues[index];
        const value = insertObject.value;
        if (insertObject.key != "*" && value !== undefined && value !== null && value !== "") {
            const key = (!insertObject.key.includes("_") ? `${table}_` : "") + `${insertObject.key}`;
            query += `${key}, `;
            values.push(value);
            insertedKeys.push(key);
        }
    }
    query = query.slice(0, -2); // Remove the last comma and space
    query += ") VALUES (";

    for (let i = 0; i < values.length; i++) {
        if (i % insertedKeys.length == 0 && i != 0) {
            query += "), ("
        }
        query += `$${i + 1}, `;
    }
        
    query = query.slice(0, -2); // Remove the last comma and space
    query += ") RETURNING *;";

    console.log("insert query  :", query);
    console.log("insert values :", values);
    return { text: query, values: values };
}


/**
 * Prepares an update query for execution
 * @param table The table to update
 * @param whereValues The values to update
 * @returns The prepared query with the values
 */
function prepareUpdate(table: QueryTable, whereValues: {}, updateValues: {}): Query {
    let query = `UPDATE ${table} SET `;
    let values: (string|number|boolean|null)[] = [];

    if (!updateValues) { return { text: "", values: [] }; }

    for (const key in updateValues) {
        if (updateValues[key] !== undefined) {
            query += `${key}=$${values.length + 1}, `;
            values.push(updateValues[key]);
        }
    }
    query = query.slice(0, -2); // Remove the last comma and space

    query += ` WHERE 1=1`;
    for (const key in whereValues) {
        if (whereValues[key] !== undefined) {
            query += ` AND ${key}=$${values.length + 1}`;
            values.push(whereValues[key]);
        }
    }
    query += ` RETURNING *;`;

    console.log("update query  :", query);
    console.log("update values :", values);
    return { text: query, values: values };
}


/**
 * Prepares a delete query for execution
 * @param table The table to delete from
 * @param whereValues The values to delete
 * @returns The prepared query with the values
 */
function prepareDelete(table: QueryTable, whereValues: {}, strict: boolean = true): Query {
    let query = `DELETE FROM ${table} WHERE 1=1`;
    let values: (string|number|boolean|null)[] = [];

    for (const key in whereValues) {
        if (whereValues[key] !== undefined) {
            query += strict ? ` AND ${key}=$${values.length + 1}` : ` AND ${key} LIKE $${values.length + 1}`;
            values.push(strict ? whereValues[key] : "%" + whereValues[key] + "%");
        }
    }
    query += ` RETURNING *;`;

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
function normalyzeKey(key: OperationsType|LoansType|TimetableType, table: QueryTable): string {
    if (key == "*") return key;
    return key.includes(`${table}_`) ? key : `${table}_${key}`;
}
