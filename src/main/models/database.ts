import pg from 'pg';
import { Columns } from "./constantes";

const { Client } = pg;
let client: pg.Client;



/*=======*/
/* Types */
/*=======*/
export type QueryType = "SELECT" | "INSERT" | "UPDATE" | "DELETE";
export type QueryTable = "users" | "operations" | "loans" | "timetable";
export type Query = { text: string; values: (string | number | boolean | null)[]; };
export type AggregationType = "SUM" | "AVG" | "COUNT" | "DISTINCT" | "MAX" | "MIN";
export type ComparisonOperatorType = "=" | ">" | "<" | "<=" | ">=" | "<>" | "!=" | "LIKE";
export type LogicalOperatorType = "AND" | "OR";
export type WhereValuesType = {
    key: UsersType|OperationsType|LoansType|TimetableType,
    comparisonOperator?: ComparisonOperatorType,
    value: string|number|boolean|null,
    logicalOperator?: LogicalOperatorType
};

/* Operations types */
export type OperationsType = "*"|"id"           |"date"           |"name"           |"amount"           |"source"           |"dest"           |"costs"           |"categ"           |"validated"           |"redundancy"           |"createdat"           |"userid"|
                                 "operations_id"|"operations_date"|"operations_name"|"operations_amount"|"operations_source"|"operations_dest"|"operations_costs"|"operations_categ"|"operations_validated"|"operations_redundancy"|"operations_createdat"|"operations_userid";
/* Users types */
export type UsersType = "*"|"id"      |"name"      |"password"      |"email"      |"pp"      |"macadresse"      |"ipadresse"      |"scheduletime"      |"createdat"|
                            "users_id"|"users_name"|"users_password"|"users_email"|"users_pp"|"users_macadresse"|"users_ipadresse"|"users_scheduletime"|"users_createdat";
/* Loans types */
export type LoansType = "*"|"id"      |"date"      |"borrower"      |"amount"      |"refundedamount"      |"loanreason"      |"createdat"      |"userid"|
                            "loans_id"|"loans_date"|"loans_borrower"|"loans_amount"|"loans_refundedamount"|"loans_loanreason"|"loans_createdat"|"loans_userid";
/* Timetable types */
export type TimetableType = "*"|"id"          |"timetabledate"          |"hoursnumber"          |"hourlyrate"          |"createdat"          |"userid"|
                                "timetable_id"|"timetable_timetabledate"|"timetable_hoursnumber"|"timetable_hourlyrate"|"timetable_createdat"|"timetable_userid";



/*==========*/
/* Function */
/*==========*/
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
 * Prepares a query for execution
 * @param queryType 
 * @param table 
 * @param whereValues 
 * @returns The prepared query with the values. If the query type is not supported, it returns an empty Query object.
 */
export function prepareQuery(queryType: QueryType, table: QueryTable, jsonParam: { key: (UsersType|OperationsType|LoansType|TimetableType)[], aggregation?: AggregationType, limit?: number, offset?: number, whereValues?: WhereValuesType[], updateValues?: [[]] }): Query {
    /* Validation des paramètres */

    /* Redirection */    
    if (queryType == "SELECT") {
        let keys: (UsersType|OperationsType|LoansType|TimetableType)[] = jsonParam.key || ["*"];
        let whereValues: WhereValuesType[] = jsonParam.whereValues || [];
        let limit: number = jsonParam.limit || null;
        let offset: number = jsonParam.offset || 0;
        let aggregation: AggregationType = jsonParam.aggregation;

        return prepareSelect(table, keys, whereValues, limit, offset, aggregation);
    } else if (queryType == "INSERT") {
        let keys: (UsersType|OperationsType|LoansType|TimetableType)[] = jsonParam.key || [];
        let updateValues = jsonParam.updateValues || [];

        //return prepareInsert(table);
    } else if (queryType == "UPDATE") {
        //return prepareUpdate(table, keys, whereValues);
    } else if (queryType == "DELETE") {
        //return prepareDelete(table, whereValues, strict);
    } else if (queryType == "DISTINCT" || queryType == "SUM" || queryType == "AVG") {
        // return prepareSelect(table, whereValues, strict, limit, offset, false, liaison, selectValues, queryType);
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
 * @param aggregation 'SUM', 'AVG', 'COUNT', 'DISTINCT', 'MAX', 'MIN'
 * @param comparisonOperator '=', '>', '<', '<=', '>=', '<>', '!=', 'LIKE'
 * @param logicalOperator 'AND', 'OR', 'NOT'
 * @returns The prepared query with the values
 */
function prepareSelect(table: QueryTable, selectValues: (UsersType|OperationsType|LoansType|TimetableType)[], whereValues: WhereValuesType[], limit: number = null, offset: number = 0, aggregation?: AggregationType): Query {
    let query = "SELECT";
    let values: (string|number|boolean|null)[] = [];

    /* Select */
    for (const index in selectValues) {
        query += aggregation ? ` ${aggregation}(` : " ";
        query += selectValues[index] != "*" ? ((!selectValues[index].includes("_") ? `${table}_` : "") + `${selectValues[index]} AS ${selectValues[index]}`) : "*";
        query += aggregation ? `) AS sum_${selectValues[index]}` : "";
        query += ","
    }
    query = query.slice(0, -1); // Remove the last comma

    /* From */
    query += ` FROM ${table}`;

    /* Where */
    for (const index in whereValues) {
        const whereObject = whereValues[index];
        const value = whereObject.value;
        if (Columns[table].includes(whereObject.key) && whereObject.key != "*" && value !== undefined && value !== null && value !== "") {
            query += parseInt(index) == 0 ? " WHERE" : "";
            const key = normalyzeKey(whereObject.key, table);
            const comparisonOperator = whereObject.comparisonOperator || "=";
            const logicalOperator = whereObject.logicalOperator || "AND";

            query += ` ${key} ${comparisonOperator} $${values.length + 1} `;
            query += parseInt(index) != whereValues.length - 1 ? logicalOperator : "";
            values.push(comparisonOperator == "LIKE" ? `%${value}%` : value);
        }
    }

    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2};`;
    values.push(limit >= 0 ? limit : null);
    values.push(offset >= 0 ? offset : 0);

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
 * Normalizes the key by removing the prefix
 * @param key 
 * @returns 
 */
function normalyzeKey(key: UsersType|OperationsType|LoansType|TimetableType, table: QueryTable): string {
    return key.includes(`${table}_`) ? key : `${table}_${key}`;
}