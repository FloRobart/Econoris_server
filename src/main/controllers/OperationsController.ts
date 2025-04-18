import { Request, Response } from "express";
import { prepareQuery, executeQuery, QueryTable } from "../models/database";
import { Tables, OperationsColumns } from "../models/constantes";



/**
 * Get all operations corresponding at parameters
 * @async
 * @param req HTTP Request
 * @param res HTTP Response
 * @returns {JSON} 200 - List of operations corresponding to the request
 * @returns {JSON} 500 - Error if the request could not be processed
 * @example
 * {
 *     "keys": [
 *         "x",
 *         "x"
 *     ],
 *     "aggregation": "x",
 *     "limit": "n",
 *     "offset": "n",
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
 *         }
 *     ]
 * }
 */
export async function getOperations(jsonParam: any): Promise<any[]|string> {
    const preparedQuery = prepareQuery("SELECT", "operations", jsonParam);
    if (preparedQuery === null) { return JSON.stringify({"error": "verifying the parameters passed in the url"}); }

    const rows = await executeQuery(preparedQuery);

    if (rows === null) {
        return JSON.stringify({"error": "Database error"});
    } else {
        return rows;
    }
}


/**
 * Save operations with parameters
 * @async
 * @param req HTTP Request
 * @param res HTTP Response
 * @returns {JSON} 200 - Operation saved if the operation has been saved
 * @returns {JSON} 500 - Error if the operation could not be saved
 * @example
 * {
 *     "keys": ["x", "y"],
 *     "updateValues": [
 *         ["x|n", "x|n"],
 *         ["x|n", "x|n"],
 *     ]
 * }
 */
export async function createOperation(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const request = JSON.parse(JSON.stringify(req.method == "GET" ? req.query : req.body));
    const jsonParam = req.method == "GET" ? { whereValues: [] } : JSON.parse(JSON.stringify(req.body));
    const table = req.params.table;
    if (!Tables.includes(table)) { return res.status(400).json({"error": "Table not found"}); }

    /* Add keys from query to the request */
    if (req.method == "GET") {
        
    }

    const preparedQuery = prepareQuery("INSERT", table as QueryTable, jsonParam);
    if (preparedQuery === null) { return res.status(500).json({"error": "verifying the parameters passed in the url"}); }

    const rows = await executeQuery(preparedQuery);

    console.log("rows :", rows);
    if (rows === null) {
        return res.status(500).json({"error": "verifying the parameters passed in the url"});
    } else {
        return res.status(200).json(rows);
    }
}


/**
 * Update operations with parameters
 * @async
 * @param req HTTP Request
 * @param res HTTP Response
 * @returns {JSON} 200 - success if the operation has been updated
 * @returns {JSON} 500 - Error if the operation could not be updated
 */
export async function updateOperation(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { id, operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, created_at, user_id, strict, limit, offset } = req.method == "GET" ? req.query : req.body.whereValues;
    const updateValues: {} = req.body.updateValues;

    console.log("updateValues :", updateValues);

    const rows = []// await executeQuery(prepareQuery("UPDATE", "operations", { id, operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, created_at, user_id, strict, limit, offset }, undefined, updateValues));

    console.log("rows :", rows);
    if (rows === null) {
        return res.status(500).json({"error": "verifying the parameters passed in the url"});
    } else {
        return res.status(200).json(rows);
    }
}


/**
 * Delete operations with parameters
 * @async
 * @param req HTTP Request
 * @param res HTTP Response
 * @returns {JSON} 200 - success if the operation has been deleted
 * @returns {JSON} 500 - Error if the operation could not be deleted
 */
export async function deleteOperation(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { id, operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, user_id, strict } = req.method == "GET" ? req.query : req.body;
    const rows = []// await executeQuery(prepareQuery("DELETE", "operations", { id, operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, user_id, strict }));
    
    console.log("rows :", rows);
    if (rows === null) {
        return res.status(500).json({"error": "verifying the parameters passed in the url"});
    } else {
        return res.status(200).json(rows);
    }
}


/**
 * Transform Query parameters to JSON object
 */
export function parseQuery(requestQuery: any, requestParam: any): any {
    const limit = parseInt(requestQuery.limit);
    const offset = parseInt(requestQuery.offset);

    let jsonParam = {
        key: ["*"],
        limit: limit != undefined ? (limit >= 0 ? limit : null) : null,
        offset: offset != undefined ? (offset >= 0 ? offset : 0) : 0,
        whereValues: []
    };




    if (OperationsColumns.includes(key)) {
        let value = request[key] instanceof Array ? request[key][request[key].length - 1] : request[key];
        if (value == undefined) { continue; }

        jsonParam.whereValues.push({
            key: "???",
            comparisonOperator: "???",
            value: "???",
            logicalOperator: "???"
        });
    }

    return jsonParam;
}

export function parseBody() {

}