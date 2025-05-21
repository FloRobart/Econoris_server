import { executeQuery, getDeleteQuery } from "../models/database";
import { JSONDeleteRequest, JSONResponse, QueryTable, ColumnsType } from "../models/types";
import * as Constantes from "../models/constantes";
import { createJsonResponse, clone, correctWhereValues } from "./Controller";



/**
 * Delete all operations corresponding at parameters
 * @async
 * @param jsonRequest JSON object with structure shown in the example (JSON Request)
 * @returns JSON object with the structure shown in the example (JSON Response)
 * @example
 * JSON Request
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
 * 
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
export async function executeDelete(table: QueryTable, jsonRequest: JSONDeleteRequest): Promise<JSONResponse> {
    try {
        const rows = await executeQuery(getDeleteQuery(table, jsonRequest));
        if (rows === null) { jsonRequest.errors.push("An unknown error occurred while executing the query"); }

        return createJsonResponse(rows, jsonRequest.warnings, jsonRequest.errors);
    } catch (error) {
        console.error("Error in executeDelete :", error);
        jsonRequest.errors.push("An unknown error occurred while executing the query");
        return createJsonResponse([], jsonRequest.warnings, jsonRequest.errors);
    }
}


/**
 * Transform Query and Path parameters to JSON object with specific structure
 * @param table Table name
 * @param request Request parameters (in query and path)
 * @returns Valid JSON object with the structure shown in the example
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
export function parseDeleteUrl(table: QueryTable, request: any): JSONDeleteRequest {
    const jsonRequest: JSONDeleteRequest = {
        whereValues: [],
        warnings: [],
        errors: []
    };

    for (let key in request) {
        let value = request[key];
        key = key.toLowerCase();

        if (key === undefined || value === undefined) {
            jsonRequest.warnings.push( key === undefined ? "Key undefined for value : '" + value + "' -> ignored" : "Value undefined for key : '" + key + "' -> ignored");
            continue;
        }

        if (Constantes.Columns[table].includes(key)) {
            jsonRequest.whereValues.push({
                key: key as ColumnsType,
                comparisonOperator: "=",
                value: value instanceof Array ? value[value.length - 1] : value,
                logicalOperator: "AND"
            });
        } else {
            jsonRequest.warnings.push("Key : '" + key + "' not in [" + Constantes.Columns[table] + "] -> ignored");
        }
    }

    return correctedJsonDeleteRequest(table, jsonRequest);
}


/**
 * Checks and corrects JSON parameters
 * @param table Table name
 * @param jsonRequest JSON parameters to check
 * @returns Valid JSON object with the structure shown in the example
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
export function correctedJsonDeleteRequest(table: QueryTable, jsonRequest: JSONDeleteRequest): JSONDeleteRequest {
    const newJsonRequest: JSONDeleteRequest = {
        whereValues: [],
        warnings: clone(jsonRequest.warnings) || [],
        errors: clone(jsonRequest.errors) || []
    };

    /* Verify where values */
    let correctedWhereValues = correctWhereValues(table, jsonRequest.whereValues);
    newJsonRequest.whereValues = correctedWhereValues.whereValues;
    newJsonRequest.warnings.push(...correctedWhereValues.warnings);

    return newJsonRequest;
}
