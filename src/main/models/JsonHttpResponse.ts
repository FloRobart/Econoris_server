/**
 * JSON HTTP Response Model
 * 
 * This model defines the structure of a JSON response object used in HTTP responses.
 * It includes arrays for rows, warnings, and errors to provide comprehensive feedback
 * about the result of an API operation.
 */
export type JsonHttpResponse = {
    rows: any[],
    warnings: string[],
    errors: string[]
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
export function createJsonResponse(rows?: any[]|null, warnings?: string[], errors?: string[]): JsonHttpResponse {
    return {
        rows: rows || [],
        warnings: warnings || [],
        errors: errors || [],
    };
}