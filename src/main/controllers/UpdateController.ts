import { executeQuery, getUpdateQuery } from "../models/database";
import { JSONUpdateRequest, JSONResponse, QueryTable, ColumnsType } from "../models/types";
import * as Constantes from "../models/constantes";
import { createJsonResponse, clone, correctWhereValues } from "./Controller";



/**
 * Update all operations corresponding at parameters
 * @async
 * @param jsonRequest JSON object with structure shown in the example (JSON Request)
 * @returns JSON object with the structure shown in the example (JSON Response)
 * @example
 * JSON Request
 * {
 *     "keysValues": {
 *         "key1": "value1",
 *         "key2": "value2",
 *         ...
 *     },
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
export async function executeUpdate(table: QueryTable, jsonRequest: JSONUpdateRequest): Promise<JSONResponse> {
    const rows = await executeQuery(getUpdateQuery(table, jsonRequest));
    if (rows === null) { jsonRequest.errors.push("An unknown error occurred while executing the query"); }

    return createJsonResponse(rows, jsonRequest.warnings, jsonRequest.errors);
}


/**
 * Transform Query and Path parameters to JSON object with specific structure
 * @param table Table name
 * @param request Request parameters (in query and path)
 * @returns Valid JSON object with the structure shown in the example
 * @example
 * {
 *     "keysValues": {
 *         "key1": "value1",
 *         "key2": "value2",
 *         ...
 *     },
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
function parseUpdateUrl(table: QueryTable, request: any): JSONUpdateRequest {
    const jsonRequest: JSONUpdateRequest = {
        keysValues: {},
        whereValues: [],
        warnings: [],
        errors: []
    };

    // TODO : À faire plus tard

    return correctedJsonUpdateRequest(table, jsonRequest);
}


/**
 * Checks and corrects JSON parameters
 * @param table Table name
 * @param jsonRequest JSON parameters to check
 * @returns Valid JSON object with the structure shown in the example
 * @example
 * {
 *     "keysValues": {
 *         "key1": "value1",
 *         "key2": "value2",
 *         ...
 *     },
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
export function correctedJsonUpdateRequest(table: QueryTable, jsonRequest: JSONUpdateRequest): JSONUpdateRequest {
    const newJsonRequest: JSONUpdateRequest = {
        keysValues: {},
        whereValues: [],
        warnings: clone(jsonRequest.warnings) || [],
        errors: clone(jsonRequest.errors) || []
    };

    /* Verify keys values */
    delete Constantes.Columns[table]["id"]
    delete Constantes.Columns[table][table + "_id"]
    for (const key in jsonRequest.keysValues) {
        const value = jsonRequest.keysValues[key];
        if (key === undefined || key === null || key === "") {
            newJsonRequest.warnings.push("Key associated to value : '" + value + "' is undefined, null or empty -> ignored");
            continue;
        }

        if (value === undefined || value === null || value === "") {
            newJsonRequest.warnings.push("Value associated to key : '" + key + "' is undefined, null or empty -> ignored");
            continue;
        }

        if (Constantes.Columns[table].includes(key)) {
            newJsonRequest.keysValues[key] = value;
        } else {
            newJsonRequest.warnings.push("Key : '" + key + "' not in [" + Constantes.Columns[table] + "] -> ignored");
        }
    }
    Constantes.Columns[table].push("id");
    Constantes.Columns[table].push(table + "_id");

    if (newJsonRequest.keysValues.length === 0) {
        newJsonRequest.errors.push("No keysValues found -> nothing updated");
        return newJsonRequest;
    }

    /* Verify where values */
    let correctedWhereValues = correctWhereValues(table, jsonRequest.whereValues);
    newJsonRequest.whereValues = correctedWhereValues.whereValues;
    newJsonRequest.warnings.push(...correctedWhereValues.warnings);

    return newJsonRequest;
}
