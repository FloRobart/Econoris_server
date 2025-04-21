import { executeQuery, getSelectQuery } from "../models/database";
import { JSONRequest, JSONResponse, QueryTable, ColumnsType, LogicalOperatorType } from "../models/types";
import * as Constantes from "../models/constantes";



/**
 * Get all operations corresponding at parameters
 * @async
 * @param jsonRequest JSON object with structure shown in the example (JSON Request)
 * @returns JSON object with the structure shown in the example (JSON Response)
 * @example
 * JSON Request
 * {
 *     "keys": [
 *         "x",
 *         "x",
 *         ...
 *     ],
 *     "aggregation": "x",
 *     "limit": n,
 *     "offset": n,
 *     "whereValues": [
 *         {
 *             "key": "x",
 *             "comparisonOperator": "x",
 *             "value": "x|n",
 *             "logicalOperator": "x"
 *         },
 *         {
 *             "key": "x",
 *             "comparisonOperator": "x",
 *             "value": "x|n"
 *         },
 *         ...
 *     ],
 *     "warnings": [
 *        "Description of the warnings -> action executed",
 *        ...
 *     ],
 *     "errors": [
 *         "Description of the error",
 *         ...
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
export async function executeSelect(table: QueryTable, jsonRequest: JSONRequest): Promise<JSONResponse> {
    const rows = await executeQuery(getSelectQuery(table, jsonRequest));

    const jsonResponse = {
        rows: rows || [],
        warnings: jsonRequest.warnings || [],
        errors: jsonRequest.errors || [],
    }

    if (rows === null) { jsonResponse.errors.push("An unknown error occurred while executing the query"); }

    return jsonResponse;
}


/**
 * Transform Query and Path parameters to JSON object with specific structure
 * @param table Table name
 * @param request Request parameters (in query and path)
 * @returns Valid JSON object with the structure shown in the example
 * @example
 * {
 *     "keys": ["*"],
 *     "aggregation": undefined,
 *     "limit": n,
 *     "offset": n,
 *     "whereValues": [
 *         {
 *             "key": "x",
 *             "comparisonOperator": "x",
 *             "value": "x|n",
 *             "logicalOperator": "x"
 *         },
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
export function parseSelectUrl(table: QueryTable, request: any): JSONRequest {
    let limit: any = request.limit || null;
    let offset: any = request.offset || 0;
    let comparisonOperator = request.comparisonOperator || "=";
    let logicalOperator = request.logicalOperator?.toUpperCase() || "AND";

    /* Verify limit */
    limit = limit instanceof Array ? limit[limit.length - 1] : limit;
    limit = !Number.isNaN(parseInt(limit, 10)) ? parseInt(limit, 10) : null;

    /* Verify offset */
    offset = offset instanceof Array ? offset[offset.length - 1] : offset;
    offset = !Number.isNaN(parseInt(offset, 10)) ? parseInt(offset, 10) : 0;

    /* JSON Request */
    let jsonRequest: JSONRequest = {
        keys: ["*"],
        aggregation: undefined,
        limit: (limit >= 0 ? limit : null),
        offset: (offset >= 0 ? offset : 0),
        whereValues: [],
        warnings: [],
        errors: []
    };

    /* Verify comparison operator */
    if (!Constantes.ComparisonOperator.includes(comparisonOperator)) {
        jsonRequest.warnings.push("Comparison operator : '" + comparisonOperator + "' not in [" + Constantes.ComparisonOperator + "] -> replaced by '='");
        comparisonOperator = "=";
    }

    /* Verify logical operator */
    if (!Constantes.LogicalOperator.includes(logicalOperator)) {
        jsonRequest.warnings.push("Logical operator : '" + logicalOperator + "' not in [" + Constantes.LogicalOperator + "] -> replaced by 'AND'");
        logicalOperator = "AND";
    }

    /* Verify keys */
    delete request.limit;
    delete request.offset;
    delete request.comparisonOperator;
    delete request.logicalOperator;

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
                comparisonOperator: comparisonOperator,
                value: value instanceof Array ? value[value.length - 1] : value,
                logicalOperator: logicalOperator
            });
        } else {
            jsonRequest.warnings.push("Key : '" + key + "' not in [" + Constantes.Columns[table] + "] -> ignored");
        }
    }

    return correctedJsonSelectRequest(table, jsonRequest);
}


/**
 * Checks and corrects JSON parameters
 * @param table Table name
 * @param jsonRequest JSON parameters to check
 * @returns Valid JSON object with the structure shown in the example
 * @example
 * {
 *     "keys": ["*"],
 *     "aggregation": "x",
 *     "limit": n,
 *     "offset": n,
 *     "whereValues": [
 *         {
 *             "key": "x",
 *             "comparisonOperator": "x",
 *             "value": "x|n",
 *             "logicalOperator": "x"
 *         },
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
export function correctedJsonSelectRequest(table: QueryTable, jsonRequest: JSONRequest): JSONRequest {
    let newJsonRequest: JSONRequest = {
        keys: [],
        aggregation: Constantes.AggregationOperator.includes(jsonRequest.aggregation?.toUpperCase()) ? jsonRequest.aggregation : undefined,
        limit: jsonRequest.limit || null,
        offset: jsonRequest.offset || 0,
        whereValues: [],
        warnings: jsonRequest.warnings || [],
        errors: jsonRequest.errors || []
    };

    /* Verify limit */
    newJsonRequest.limit = newJsonRequest.limit instanceof Array ? newJsonRequest.limit[newJsonRequest.limit.length - 1] : newJsonRequest.limit;
    newJsonRequest.limit = !Number.isNaN(parseInt(String(newJsonRequest.limit), 10)) ? parseInt(String(newJsonRequest.limit), 10) : null;
    newJsonRequest.limit = (newJsonRequest.limit >= 0 ? newJsonRequest.limit : null);

    /* Verify offset */
    newJsonRequest.offset = newJsonRequest.offset instanceof Array ? newJsonRequest.offset[newJsonRequest.offset.length - 1] : newJsonRequest.offset;
    newJsonRequest.offset = !Number.isNaN(parseInt(String(newJsonRequest.offset), 10)) ? parseInt(String(newJsonRequest.offset), 10) : 0;
    newJsonRequest.offset = (newJsonRequest.offset >= 0 ? newJsonRequest.offset : 0);

    /* Verify keys */
    for (const index in jsonRequest.keys) {
        const key = jsonRequest.keys[index]?.toLowerCase();
        if (key === undefined) {
            newJsonRequest.warnings.push("key n°" + index + " undefined -> ignored");
            continue;
        }

        if (Constantes.Columns[table].includes(key) || key == "*") {
            newJsonRequest.keys.push(key as ColumnsType);
        } else {
            newJsonRequest.warnings.push("Key : '" + key + "' not in ['*'," + Constantes.Columns[table] + "] -> ignored");
        }
    }

    if (newJsonRequest.keys.length === 0) {
        newJsonRequest.warnings.push("No key found -> '*' added");
        newJsonRequest.keys.push("*");
    }

    /* Verify where values */
    for (const index in jsonRequest.whereValues) {
        const key = jsonRequest.whereValues[index].key?.toLowerCase();
        const value = jsonRequest.whereValues[index].value;
        const comparisonOperator = jsonRequest.whereValues[index].comparisonOperator;
        const logicalOperator = jsonRequest.whereValues[index].logicalOperator?.toUpperCase();

        if (key === undefined || value === undefined) {
            newJsonRequest.warnings.push( key === undefined ? "Key undefined for value : '" + value + "' -> ignored" : "Value undefined for key : '" + key + "' -> ignored");
            continue;
        }

        if (Constantes.Columns[table].includes(key)) {
            if (Constantes.ComparisonOperator.includes(comparisonOperator) || comparisonOperator == undefined) {
                if (Constantes.LogicalOperator.includes(logicalOperator) || logicalOperator == undefined) {
                    newJsonRequest.whereValues.push({
                        key: key as ColumnsType,
                        comparisonOperator: comparisonOperator || "=",
                        value: value,
                        logicalOperator: (logicalOperator || "AND") as LogicalOperatorType
                    });
                } else {
                    newJsonRequest.warnings.push("Logical operator : '" + logicalOperator + "' not in [" + Constantes.LogicalOperator + "] for key : '" + key + "' -> replaced by 'AND'");
                }
            } else {
                newJsonRequest.warnings.push("Comparison operator : '" + comparisonOperator + "' not in [" + Constantes.ComparisonOperator + "] for key : '" + key + "' -> replaced by '='");
            }
        } else {
            newJsonRequest.warnings.push("Key : '" + key + "' not in [" + Constantes.Columns[table] + "] -> ignored");
        }
    }

    return newJsonRequest;
}
