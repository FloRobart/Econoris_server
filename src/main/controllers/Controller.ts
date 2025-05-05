import { JSONResponse } from "../models/types";



/**
 * Clone an object or array.
 * @param element The object or array to be cloned.
 * @returns A deep clone of the input object or array.
 */
export function clone(element: any): any {
    if (element === undefined) { return undefined; }
    return JSON.parse(JSON.stringify(element));
}

/**
 * Create a JSON response object.
 * @param rows Array of rows to be included in the response.
 * @param warnings Array of warning messages to be included in the response.
 * @param errors Array of error messages to be included in the response.
 * @returns JSON object with the structure shown in the example (JSON Response)
 * @example
 * JSON Response
 * {
 *     "rows": [
 *         {
 *             "key": "value",
 *             "key": "value",
 *             ...
 *         }
 *     ],
 *     "warnings": [
 *         "Description of the warnings -> action executed",
 *         ...
 *     ],
 *     "errors": [
 *         "Description of the error",
 *         ...
 *     ]
 */
export function createJsonResponse(rows?: any[], warnings?: string[], errors?: string[]): JSONResponse {
    return {
        rows: rows || [],
        warnings: warnings || [],
        errors: errors || [],
    };
}
