import { Operations } from "../models/OperationsModel";
import { executeQuery } from "./database";



/**
 * Get all operations from the database.
 * @param userid The ID of the user to get operations for.
 * @param limit The maximum number of results to return. Default is 0 (no limit).
 * @param offset The number of results to skip. Default is null (no offset).
 * @param constraints An object containing key-value pairs to filter the results.
 *                    Keys are column names and values are the values to filter by.
 *                    String values will be matched using a LIKE query, while numeric values will use an exact match.
 *                    Example: { operations_name: 'name', operations_amount: 50 }
 * @returns Array of Operations objects.
 */
export async function selectOperations(userid: number, limit: number = 0, offset: number|null = null, constraints: { [key: string]: string|number } = {}): Promise<Operations[]> {
    let query = `SELECT * FROM operations WHERE operations_userid = $1`;
    let values: (string|number)[] = [userid];

    for (const [key, value] of Object.entries(constraints)) {
        if (typeof value === 'string') {
            query += ` AND ${key} LIKE $${values.length + 1}`;
            values.push(`%${value}%`);
        } else {
            query += ` AND ${key} = $${values.length + 1}`;
            values.push(value);
        }
    }

    if (limit > 0) {
        query += ` LIMIT $${values.length + 1}`;
        values.push(limit);
    }

    if (offset !== null && offset >= 0) {
        query += ` OFFSET $${values.length + 1}`;
        values.push(offset);
    }

    return (executeQuery({ text: query, values: values }) || []) as Promise<Operations[]>;
}

/**
 * Insert a new operation into the database.
 * @param userid The ID of the user inserting the operation.
 * @param operation The operation to insert.
 * @returns The inserted operation with its new ID.
 */
export async function insertOperation(userid: number, operation: Operations): Promise<Operations|null> {
    let query = `INSERT INTO operations (operations_userid, `;
    let values: (string|number)[] = [userid];

    for (const [key, value] of Object.entries(operation)) {
        if (value !== undefined && key !== "operations_id" && key !== "operations_userid") {
            query += `${key}, `;
            values.push(value);
        }
    }

    query = query.slice(0, -2) + `) VALUES (${values.map((_, i) => `$${i + 1}`).join(", ")}) RETURNING *`;
    const result = await executeQuery({ text: query, values }) as Operations[];
    return (result && result.length > 0) ? result[0] : null;
}

/**
 * Update an existing operation in the database.
 * @param userid The ID of the user updating the operation.
 * @param operation The operation to update.
 * @returns The updated operation.
 */
export async function updateOperation(userid: number, operation: Operations): Promise<Operations|null> {
    let query = `UPDATE operations SET `;
    let values: (string|number)[] = [];
    let setClauses: string[] = [];

    for (const [key, value] of Object.entries(operation)) {
        if (value !== undefined && key !== "operations_id" && key !== "operations_userid") {
            setClauses.push(`${key} = $${values.length + 1}`);
            values.push(value);
        }
    }

    query += setClauses.join(", ") + ` WHERE operations_id = $${values.length + 1} AND operations_userid = $${values.length + 2} RETURNING *`;
    values.push(operation.operations_id!);
    values.push(userid);

    const result = await executeQuery({ text: query, values }) as Operations[];
    return (result && result.length > 0) ? result[0] : null;
}

/**
 * Delete an operation from the database.
 * @param userid The ID of the user deleting the operation.
 * @param id The ID of the operation to delete.
 * @returns True if the operation was deleted, false otherwise.
 */
export async function deleteOperationById(userid: number, operations_id: number): Promise<boolean> {
    const result = await executeQuery({ text: `DELETE FROM operations WHERE operations_id = $1 AND operations_userid = $2`, values: [operations_id, userid] });
    return (result !== null);
}
