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