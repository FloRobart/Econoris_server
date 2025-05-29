import { executeQuery, getDeleteQuery } from "./database";
import { JSONDeleteRequest, JSONResponse, QueryTable, ColumnsType } from "../utils/types";
import * as Constantes from "../utils/constantes";
import * as logger from '../utils/logger';
import { createJsonResponse, parseWhereValues } from "./parser";
import { clone } from "../utils/utils";



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
        logger.error(error);
        logger.error("Error in executeDelete");
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
export function parseDeleteUrl(table: QueryTable, request: any, user: any): JSONDeleteRequest {
    const jsonRequest: JSONDeleteRequest = {
        whereValues: [],
        warnings: [],
        errors: []
    };

    try {
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
    } catch (error) {
        logger.error(error);
        logger.error("Error in parseDeleteUrl");
        jsonRequest.errors.push("An unknown error occurred while parsing the request");
    }

    return parseJsonDeleteRequest(table, jsonRequest, user);
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
export function parseJsonDeleteRequest(table: QueryTable, jsonRequest: JSONDeleteRequest, user: any): JSONDeleteRequest {
    const newJsonRequest: JSONDeleteRequest = {
        whereValues: [],
        warnings: clone(jsonRequest.warnings) || [],
        errors: clone(jsonRequest.errors) || []
    };

    newJsonRequest.whereValues.push({
        key: "userid",
        comparisonOperator: "=",
        value: user.id || 0,
        logicalOperator: "AND"
    });

    /* Verify where values */
    try {
        let correctedWhereValues = parseWhereValues(table, jsonRequest.whereValues);
        newJsonRequest.whereValues.push(...correctedWhereValues.whereValues);
        newJsonRequest.warnings.push(...correctedWhereValues.warnings);
    } catch (error) {
        logger.error(error);
        logger.error("Error in parseJsonDeleteRequest");
        newJsonRequest.errors.push("An unknown error occurred while correcting the where values");
    }

    return newJsonRequest;
}
