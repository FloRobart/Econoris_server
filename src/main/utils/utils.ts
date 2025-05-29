import * as logger from "./logger";
import { ColumnsType, QueryTable } from "./types";



/**
 * Gets a valid port number
 * @param val Port number
 * @returns Valid port number or null if the port number is not a number
 */
export function normalizePort(val: string): number | null {
    var port = parseInt(val.replace(" ", ""), 10);
    if (isNaN(port)) { return null; }
    return Math.max(0, Math.min(port, 65535));
}


/**
 * Normalizes the key by adding the prefix of the table if it is not already present
 * @param key The key to normalize
 * @param table The table to normalize the key for
 * @returns 
 */
export function normalyzeKey(key: ColumnsType, table: QueryTable): string {
    if (key == "*") return key;
    return key.includes(`${table}_`) ? key : `${table}_${key}`;
}


/**
 * Clone an object or array.
 * @param element The object or array to be cloned.
 * @returns A deep clone of the input object or array.
 */
export function clone(element: any): any {
    try {
        if (element === undefined) { return undefined; }
        return JSON.parse(JSON.stringify(element));
    } catch (error) {
        logger.error(error);
        logger.error("Error in clone function");
        return element;
    }
}