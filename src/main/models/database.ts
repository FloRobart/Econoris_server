import pg from 'pg';
require('dotenv').config();

const { Client } = pg;
const DB_URI = process.env.DB_URI;
let client: pg.Client;



/*=======*/
/* Types */
/*=======*/
export type QueryType = "SELECT" | "INSERT" | "UPDATE" | "DELETE" | "SUM" | "DISTINCT" | "AVG";
export type QueryTable = "users" | "operations" | "loans" | "timetable";
export type Query = { text: string; values: (string | number | boolean | null)[]; }



/*==========*/
/* Function */
/*==========*/
/**
 * Connects the server to the database
 * @async
 * @returns true if connected successfully, otherwise false
 */
export async function connectToDatabase(): Promise<boolean> {
    try {
        client = new Client(DB_URI);
        await client.connect();

        client.on('error', (err) => {
            console.error(err);
            console.error("\n [❌] DATABASE ERROR")
        });

        client.on('end', () => {
            console.log("\n [❌] DATABASE CONNECTION CLOSED")
        });

        return true;
    } catch (err) {
        console.error(err);
        console.error("\n [❌] FAILED CONNECTING TO DATABASE");
        return false;
    }
}

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
 * Prepares a query for execution
 * @param queryType 
 * @param table 
 * @param whereValues 
 * @returns The prepared query with the values. If the query type is not supported, it returns an empty Query object.
 */
export function prepareQuery(queryType: QueryType, table: QueryTable, whereValues: {}, selectValues?: string[], updateValues?: {}): Query {
    const limit = whereValues["limit"];
    const strict = whereValues["strict"] == "false" ? false : true;
    const offset = whereValues["offset"];
    const countOnly = whereValues["countOnly"] == "true" ? true : false;

    delete whereValues["limit"];
    delete whereValues["strict"];
    delete whereValues["offset"];
    delete whereValues["countOnly"];

    if (queryType == "SELECT") {
        return prepareSelect(table, whereValues, strict, limit, offset, countOnly, selectValues);
    } else if (queryType == "INSERT") {
        return prepareInsert(table, whereValues);
    } else if (queryType == "UPDATE") {
        return prepareUpdate(table, whereValues, updateValues);
    } else if (queryType == "DELETE") {
        return prepareDelete(table, whereValues, strict);
    } else if (queryType == "DISTINCT" || queryType == "SUM" || queryType == "AVG") {
        return prepareSelect(table, whereValues, strict, limit, offset, false, selectValues, queryType);
    }

    return { text: "", values: [] };
}


/**
 * Prepares a select query for execution
 * @param table The table to select from
 * @param whereValues The values to use in the query
 * @param strict Whether to use strict comparison or not
 * @param limit The maximum number of rows to return
 * @param offset The number of rows to skip before starting to return rows
 * @param orderBy The column to order the results by
 * @param countOnly Whether to count the number of rows only
 * @returns The prepared query with the values
 */
function prepareSelect(table: QueryTable, whereValues: {}, strict: boolean, limit: number|undefined, offset: number|undefined, countOnly: boolean = false, selectValues?: string[], operand?: string): Query {
    let query = "SELECT";
    let values: (string|number|boolean|null)[] = [];

    if (selectValues && selectValues.length > 0) {
        for (const key in selectValues) {
            if (operand) {
                query += ` ${operand}(${selectValues[key]}) AS ${selectValues[key]},`;
            } else {
                query += ` ${selectValues[key]},`;
            }
        }
        query = query.slice(0, -1); // Remove the last comma
    } else {
        query += !countOnly ? " *" : " COUNT(*) AS count";
    }

    query += ` FROM ${table} WHERE 1=1`;
    for (const key in whereValues) {
        if (whereValues[key] !== undefined) {
            query += strict ? ` AND ${key}=$${values.length + 1}` : ` AND ${key} LIKE $${values.length + 1}`;
            values.push(strict ? whereValues[key] : "%" + whereValues[key] + "%");
        }
    }

    if (!countOnly) {
        query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2};`;
        values.push(limit || null);
        values.push(offset || 0);
    } else {
        query += `;`;
    }

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
function prepareInsert(table: QueryTable, insertValues: {}): Query {
    let query = `INSERT INTO ${table} (`;
    let values: (string|number|boolean|null)[] = [];

    for (const key in insertValues) {
        if (insertValues[key] !== undefined) {
            query += `${key}, `;
            values.push(insertValues[key]);
        }
    }
    query = query.slice(0, -2); // Remove the last comma and space
    query += ") VALUES (";
    for (let i = 0; i < values.length; i++) {
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