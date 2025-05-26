import { executeQuery, getInsertQuery } from "../models/database";
import { JSONInsertRequest, JSONResponse, QueryTable, ColumnsType, LogicalOperatorType } from "../models/types";
import * as Constantes from "../models/constantes";
import * as logger from '../models/logger';
import { createJsonResponse, clone } from "./Controller";



/**
 * Insert all operations corresponding at parameters
 * @async
 * @param jsonRequest JSON object with structure shown in the example (JSON Request)
 * @returns JSON object with the structure shown in the example (JSON Response)
 * @example
 * JSON Request
 * {
 *     "returnedKeys": [
 *         "*"
 *     ],
 *     "insertions": [
 *         {
 *             "key": "value",
 *             "key": "value",
 *             ...
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
 *         },
 *         ...
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
export async function executeInsert(table: QueryTable, jsonRequest: JSONInsertRequest): Promise<JSONResponse> {
    try {
        let rows: any[] = [];
        for (const index in jsonRequest.insertions) {
            const rowsTemp = await executeQuery(getInsertQuery(table, {
                returnedKeys: jsonRequest.returnedKeys,
                insertions: [jsonRequest.insertions[index]],
                warnings: jsonRequest.warnings,
                errors: jsonRequest.errors
            }));

            if (rowsTemp === null) {
                jsonRequest.errors.push("An error occurred while executing the query for insertions n°" + index);
                continue;
            }

            if (rowsTemp.length > 0) {
                rows.push(...rowsTemp);
            }
        }

        return createJsonResponse(rows, jsonRequest.warnings, jsonRequest.errors);
    } catch (error) {
        logger.error(error);
        logger.error("Error in executeInsert");
        jsonRequest.errors.push("An unknown error occurred while executing the query");
        return createJsonResponse([], jsonRequest.warnings, jsonRequest.errors);
    }
}


/**
 * Checks and corrects JSON parameters
 * @param table Table name
 * @param jsonRequest JSON parameters to check
 * @returns Valid JSON object with the structure shown in the example
 * @example
 * {
 *     "returnedKeys": [
 *         "*"
 *     ],
 *     "insertions": [
 *         {
 *             "key": "value",
 *             "key": "value",
 *             ...
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
export function correctedJsonInsertRequest(table: QueryTable, jsonRequest: any, user: any): JSONInsertRequest {
    let newJsonRequest: JSONInsertRequest = {
        returnedKeys: [],
        insertions: [],
        warnings: clone(jsonRequest.warnings) || [],
        errors: clone(jsonRequest.errors) || []
    };

    try {
        /* Verify returned values */
        if (jsonRequest.returnedKeys !== undefined && jsonRequest.returnedKeys !== null) {
            if (Array.isArray(jsonRequest.returnedKeys)) {
                for (const index in jsonRequest.returnedKeys) {
                    const key = jsonRequest.returnedKeys[index]?.toLowerCase();
                    if (key === undefined || key === null || key === "") {
                        newJsonRequest.warnings.push("Returned key n°" + index + " undefined, null or empty -> ignored");
                        continue;
                    }

                    if (Constantes.Columns[table].includes(key) || key === "*") {
                        newJsonRequest.returnedKeys.push(key as ColumnsType);
                    } else {
                        newJsonRequest.warnings.push("Returned key : '" + key + "' not in ['*'," + Constantes.Columns[table] + "] -> ignored");
                    }
                }
            } else if (typeof jsonRequest.returnedKeys === "string") {
                const key = jsonRequest.returnedKeys?.toLowerCase();
                if (key === undefined || key === null || key === "") {
                    newJsonRequest.warnings.push("Returned key undefined, null or empty -> ignored");
                } else if (Constantes.Columns[table].includes(key) || key === "*") {
                    newJsonRequest.returnedKeys.push(key as ColumnsType);
                } else {
                    newJsonRequest.warnings.push("Returned key : '" + key + "' not in ['*'," + Constantes.Columns[table] + "] -> ignored");
                }
            } else {
                newJsonRequest.warnings.push("Returned keys is not an array or a string -> ignored");
            }
        } else {
            newJsonRequest.warnings.push("Returned keys undefined or null -> ignored");
        }

        if (newJsonRequest.returnedKeys.length === 0) {
            newJsonRequest.warnings.push("No returned key found -> no returned key");
            newJsonRequest.returnedKeys = null;
        }

        /* Verify insertions */
        delete Constantes.Columns[table]["id"];
        delete Constantes.Columns[table][table + "_id"];

        if(jsonRequest.insertions !== undefined && jsonRequest.insertions !== null) {
            if (Array.isArray(jsonRequest.insertions)) {
                for (const i in jsonRequest.insertions) {
                    const element = jsonRequest.insertions[i];
                    for (const key in element) {
                        let rep = verifyKeyValue(table, key, element[key]);
                        if (rep.warnings.length > 0) {
                            newJsonRequest.warnings.push(...rep.warnings);
                        } else {
                            if (rep[key] !== undefined) {
                                newJsonRequest.insertions[i] = newJsonRequest.insertions[i] || {};
                                newJsonRequest.insertions[i][key] = rep[key];
                            }
                        }
                    }
                    newJsonRequest.insertions[i]["userid"] = user.id || 0; // Add user id to insertions
                }
            } else if (typeof jsonRequest.insertions === "object") {
                for (const key in jsonRequest.insertions) {
                    let rep = verifyKeyValue(table, key, jsonRequest.insertions[key]);
                    if (rep.warnings.length > 0) {
                        newJsonRequest.warnings.push(...rep.warnings);
                    } else {
                        if (rep[key] !== undefined) {
                            newJsonRequest.insertions[0] = newJsonRequest.insertions[0] || {};
                            newJsonRequest.insertions[0][key] = rep[key];
                        }
                    }
                }
                newJsonRequest.insertions[0]["userid"] = user.id || 0; // Add user id to insertions
            }
        }

        Constantes.Columns[table].push("id");
        Constantes.Columns[table].push(table + "_id");
    } catch (error) {
        if (!Constantes.Columns[table].includes("id")) {
            Constantes.Columns[table].push("id");
            Constantes.Columns[table].push(table + "_id");
        }

        logger.error(error);
        logger.error("Error in correctedJsonInsertRequest");
        newJsonRequest.errors.push("An unknown error occurred while correcting the JSON request");
    }

    return newJsonRequest;
}


/**
 * Verify key and value is correct and not null, empty or undefined
 * @param key key
 * @param value value
 * @returns Object with the structure shown in the example
 * @example
 * {
 *     "key": "value"
 *     "warnings": [
 *         "warning",
 *         ...
 *     ]
 * }
 */
function verifyKeyValue(table: QueryTable, key: string, value: string): any {
    let response = {
        warnings: []
    };

    if (key === undefined || key === null || key === "") {
        response.warnings.push("Key associated to value : '" + value + "' is undefined, null or empty -> ignored");
    }

    if (!Constantes.Columns[table].includes(key)) {
        response.warnings.push("Key : '" + key + "' not in [" + Constantes.Columns[table] + "] -> ignored");
    }

    if (value === undefined || value === null) {
        response.warnings.push("Value associated to key : '" + key + "' is undefined or null -> ignored");
    }

    if (response.warnings.length === 0) {
        response[key] = value;
    }

    return response;
}


/**
 * Checks and corrects JSON parameters
 * @param table Table name
 * @param jsonRequest JSON parameters to check
 * @returns Valid JSON object with the structure shown in the example
 * @example
 * {
 *     "returnedKeys": [
 *         "*"
 *     ],
 *     "keys": [
 *         "x",
 *         "y",
 *         ...
 *     ],
 *     "values": [
 *         [
 *             "value1_Ope1",
 *             "value2_Ope1",
 *             ...
 *         ],
 *         [
 *             "value1_Ope2",
 *             "value2_Ope2",
 *             ...
 *         ],
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
// function OLD_correctedJsonInsertRequest(table: QueryTable, jsonRequest: any): JSONInsertRequest {
//     let newJsonRequest: JSONInsertRequest = {
//         returnedKeys: [],
//         keys: [],
//         values: [],
//         warnings: clone(jsonRequest.warnings) || [],
//         errors: clone(jsonRequest.errors) || []
//     };

//     /* Verify returned values */
//     if (jsonRequest.returnedKeys !== undefined && jsonRequest.returnedKeys !== null) {
//         if (Array.isArray(jsonRequest.returnedKeys)) {
//             for (const index in jsonRequest.returnedKeys) {
//                 const key = jsonRequest.returnedKeys[index]?.toLowerCase();
//                 if (key === undefined || key === null || key === "") {
//                     newJsonRequest.warnings.push("Returned key n°" + index + " undefined, null or empty -> ignored");
//                     continue;
//                 }

//                 if (Constantes.Columns[table].includes(key) || key === "*") {
//                     newJsonRequest.returnedKeys.push(key as ColumnsType);
//                 } else {
//                     newJsonRequest.warnings.push("Returned key : '" + key + "' not in ['*'," + Constantes.Columns[table] + "] -> ignored");
//                 }
//             }
//         } else if (typeof jsonRequest.returnedKeys === "string") {
//             const key = jsonRequest.returnedKeys?.toLowerCase();
//             if (key === undefined || key === null || key === "") {
//                 newJsonRequest.warnings.push("Returned key undefined, null or empty -> ignored");
//             } else if (Constantes.Columns[table].includes(key) || key === "*") {
//                 newJsonRequest.returnedKeys.push(key as ColumnsType);
//             } else {
//                 newJsonRequest.warnings.push("Returned key : '" + key + "' not in ['*'," + Constantes.Columns[table] + "] -> ignored");
//             }
//         } else {
//             newJsonRequest.warnings.push("Returned keys is not an array or a string -> ignored");
//         }
//     } else {
//         newJsonRequest.warnings.push("Returned keys undefined or null -> ignored");
//     }

//     if (newJsonRequest.returnedKeys.length === 0) {
//         newJsonRequest.warnings.push("No returned key found -> no returned key");
//         newJsonRequest.returnedKeys = null;
//     }

//     /* Verify keys */
//     delete Constantes.Columns[table]["id"];
//     delete Constantes.Columns[table][table + "_id"];
//     if (jsonRequest.keys !== undefined && jsonRequest.keys !== null) {
//         if (Array.isArray(jsonRequest.keys)) {
//             for (const index in jsonRequest.keys) {
//                 const key = jsonRequest.keys[index]?.toLowerCase();
//                 if (key === undefined || key === null || key === "") {
//                     newJsonRequest.warnings.push("Key n°" + index + " undefined, null or empty -> ignored");
//                     continue;
//                 }
//                 if (Constantes.Columns[table].includes(key)) {
//                     newJsonRequest.keys.push(key as ColumnsType);
//                 } else {
//                     newJsonRequest.warnings.push("Key : '" + key + "' not in [" + Constantes.Columns[table] + "] -> ignored");
//                 }
//             }
//         } else if (typeof jsonRequest.keys === "string") {
//             const key = jsonRequest.keys?.toLowerCase();
//             if (key === undefined || key === null || key === "") {
//                 newJsonRequest.errors.push("Key undefined, null or empty -> error");
//             } else if (Constantes.Columns[table].includes(key)) {
//                 newJsonRequest.keys.push(key as ColumnsType);
//             } else {
//                 newJsonRequest.errors.push("Key : '" + key + "' not in [" + Constantes.Columns[table] + "] -> error");
//             }
//         } else {
//             newJsonRequest.errors.push("Keys is not an array or a string -> error");
//         }
//     } else {
//         newJsonRequest.errors.push("Keys undefined or null -> error");
//     }

//     if (newJsonRequest.keys.length === 0) {
//         newJsonRequest.errors.push("No key found -> error");
//     }

//     Constantes.Columns[table].push("id");
//     Constantes.Columns[table].push(table + "_id");

//     /* Verify values */
//     if (jsonRequest.values !== undefined && jsonRequest.values !== null) {
//         if (Array.isArray(jsonRequest.values)) {
//             for (const i in jsonRequest.values) {
//                 const element = jsonRequest.values[i];
//                 for (const j in element) {
//                     const value = element[j];
//                     if (value === undefined || value === null) {
//                         newJsonRequest.warnings.push("Value n°" + j + " in " + table + " n°" + i + " undefined or null -> ignored");
//                         continue;
//                     }

//                     newJsonRequest.values[i] = newJsonRequest.values[i] || {};
//                 }
//             }
//         } else {
//             newJsonRequest.errors.push("Values is not an array -> ignored");
//         }
//     } else {
//         newJsonRequest.errors.push("Values undefined or null -> error");
//     }

//     if (newJsonRequest.values.length === 0) {
//         newJsonRequest.errors.push("No value found -> error");
//     }

//     return newJsonRequest;
// }
