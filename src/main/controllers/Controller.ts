import { JSONResponse } from "../models/types";
import { WhereValuesType, LogicalOperatorType, QueryTable, ColumnsType } from "../models/types";
import * as Constantes from "../models/constantes";
import * as logger from "../models/logger";



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

/**
 * Correct whereValues structure (displayed in the example)
 * @param whereValues Table of object displayed in the example
 * @returns Object with with the Response structure displayed in the example
 * @example
 * whereValues
 * {
 *     "key": "x",
 *     "comparisonOperator": "x",
 *     "value": "x|n",
 *     "logicalOperator": "x"
 * }
 * 
 * Response
 * {
 *     whereValues: [
 *         {
 *             "key": "x",
 *             "comparisonOperator": "x",
 *             "value": "x|n",
 *             "logicalOperator": "x"
 *         },
 *         ...
 *     ],
 *     warnings: [
 *         "warning",
 *         ...
 *     ]
 * }
 */
export function correctWhereValues(table: QueryTable, whereValues: WhereValuesType[]): { whereValues: WhereValuesType[], warnings: string[] } {
    const newWhereValues: WhereValuesType[] = [];
    const warnings: string[] = [];

    for (const index in whereValues) {
            const key = clone(whereValues[index].key?.toLowerCase());
            const value = clone(whereValues[index].value);
            const comparisonOperator = clone(whereValues[index].comparisonOperator);
            const logicalOperator = clone(whereValues[index].logicalOperator?.toUpperCase());
    
            if (key === undefined || key === null || key === "" || value === undefined || value === null || value === "") {
                warnings.push((key === undefined || key === null || key === "") ? ("Key undefined, null or empty for value : '" + value + "' -> ignored") : ("Value undefined, null or empty for key : '" + key + "' -> ignored"));
                continue;
            }
    
            if (Constantes.Columns[table].includes(key)) {
                if (Constantes.ComparisonOperator.includes(comparisonOperator) || comparisonOperator == undefined) {
                    if (Constantes.LogicalOperator.includes(logicalOperator) || logicalOperator == undefined) {
                        newWhereValues.push({
                            key: key as ColumnsType,
                            comparisonOperator: comparisonOperator || "=",
                            value: value,
                            logicalOperator: (logicalOperator || "AND") as LogicalOperatorType
                        });
                    } else {
                        warnings.push("Logical operator : '" + logicalOperator + "' not in [" + Constantes.LogicalOperator + "] for key : '" + key + "' -> replaced by 'AND'");
                    }
                } else {
                    warnings.push("Comparison operator : '" + comparisonOperator + "' not in [" + Constantes.ComparisonOperator + "] for key : '" + key + "' -> replaced by '='");
                }
            } else {
                warnings.push("Key : '" + key + "' not in [" + Constantes.Columns[table] + "] -> ignored");
            }
        }

    return { whereValues: newWhereValues, warnings: warnings};
}