import { Express, Request, Response } from "express";
import { prepareQuery, executeQuery, QueryType } from "../models/database";


/**
 * Permet d'initialiser les routes de l'application
 * @param app Application Express
 * @returns void
 */
export function initOperationsRoutes(app: Express): void {
    /*=============*/
    /*     GET     */
    /*=============*/
    /**
     * Get all operations corresponding at parameters passed in the url
     * @route GET /get/operations
     * @group Operations
     * @returns {JSON} 200 - List of operations corresponding to the request
     * @returns {TEXT} 500 - Error if the request could not be processed
     */
    app.get('/get/operations/all', async (req: Request, res: Response) => { getOperations(req, res); });

    /**
     * Save operations with parameters passed in the url into the database
     * @route GET /create/operations
     * @group Operations
     * @returns {JSON} 200 - Operation saved if the operation has been saved
     * @returns {TEXT} 500 - Error if the operation could not be saved
     */
    app.get('/create/operations', async (req: Request, res: Response) => { createOperation(req, res); });
    
    /**
     * Update operations with parameters passed in the url into the database
     * @route GET /update/operations
     * @group Operations
     * @returns {TEXT} 200 - success if the operation has been updated
     * @returns {TEXT} 500 - Error if the operation could not be updated
     */
    // app.get('/update/operations', async (req: Request, res: Response) => { updateOperation(req, res); });

    /**
     * Delete operations with parameters passed in the url into the database
     * @route GET /delete/operations
     * @group Operations
     * @returns {TEXT} 200 - success if the operation has been deleted
     * @returns {TEXT} 500 - Error if the operation could not be deleted
     */
    app.get('/delete/operations', async (req: Request, res: Response) => { deleteOperation(req, res); });



    /*==============*/
    /*     POST     */
    /*==============*/
    /**
     * Get all operations corresponding at parameters passed in body of the http request
     * @route POST /get/operations
     * @group Operations
     * @returns {JSON} 200 - List of operations corresponding to the request
     * @returns {TEXT} 500 - Error if the request could not be processed
     */
    app.post('/get/operations/all', async (req: Request, res: Response) => { getOperations(req, res); });

    /**
     * Get part of operations corresponding at parameters passed in body of the http request
     * @route POST /get/operations/sum
     * @group Operations
     * @returns {JSON} 200 - List of operations corresponding to the request
     * @returns {TEXT} 500 - Error if the request could not be processed
     */
    app.post('/get/operations/partial', async (req: Request, res: Response) => { getOperations(req, res); });

    /**
     * Save operations with parameters passed in the body of the http request into the database
     * @route POST /create/operations
     * @group Operations
     * @returns {JSON} 200 - Operation saved if the operation has been saved
     * @returns {TEXT} 500 - Error if the operation could not be saved
     */
    app.post('/create/operations', async (req: Request, res: Response) => { createOperation(req, res); });

    /**
     * Update operations with parameters passed in the body of the http request into the database
     * @route POST /update/operations
     * @group Operations
     * @returns {TEXT} 200 - success if the operation has been updated
     * @returns {TEXT} 500 - Error if the operation could not be updated
     */
    app.post('/update/operations', async (req: Request, res: Response) => { updateOperation(req, res); });

    /**
     * Delete operations with parameters passed in the body of the http request into the database
     * @route POST /delete/operations
     * @group Operations
     * @returns {TEXT} 200 - success if the operation has been deleted
     * @returns {TEXT} 500 - Error if the operation could not be deleted
     */
    app.post('/delete/operations', async (req: Request, res: Response) => { deleteOperation(req, res); });



    /*===================*/
    /*     FUNCTIONS     */
    /*===================*/
    /**
     * Get all operations corresponding at parameters
     * @param type Type of http request (GET or POST)
     * @param req HTTP Request
     * @param res HTTP Response
     * @returns {JSON} 200 - List of operations corresponding to the request
     * @returns {TEXT} 500 - Error if the request could not be processed
     */
    async function getOperations(req: Request, res: Response): Promise<void> {
        const { id, operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, created_at, user_id, strict, limit, offset, countOnly } = req.method == "GET" ? req.query : req.body.whereValues;
        const selectValues: string[]|undefined = req.body.selectValues;
        const wantedValues: QueryType = req.body.wantedValues || "SELECT";

        const rows = await executeQuery(prepareQuery(wantedValues, "operations", { id, operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, created_at, user_id, strict, limit, offset, countOnly }, selectValues));

        console.log(rows);
        if (rows === null) {
            res.status(500).json({"error": "verifying the parameters passed in the url"});
        } else {
            res.status(200).json(rows);
        }
    }


    /**
     * Save operations with parameters
     * @param type Type of http request (GET or POST)
     * @param req HTTP Request
     * @param res HTTP Response
     * @returns {JSON} 200 - Operation saved if the operation has been saved
     * @returns {TEXT} 500 - Error if the operation could not be saved
     */
    async function createOperation(req: Request, res: Response): Promise<void> {
        const { operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, user_id } = req.method == "GET" ? req.query : req.body;
        const rows = await executeQuery(prepareQuery("INSERT", "operations", { operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, user_id }));
        
        console.log(rows);
        if (rows === null) {
            res.status(500).json({"error": "verifying the parameters passed in the url"});
        } else {
            res.status(200).json(rows);
        }
    }


    /**
     * Update operations with parameters
     * @param type Type of http request (GET or POST)
     * @param req HTTP Request
     * @param res HTTP Response
     * @returns {TEXT} 200 - success if the operation has been updated
     * @returns {TEXT} 500 - Error if the operation could not be updated
     */
    async function updateOperation(req: Request, res: Response): Promise<void> {
        const { id, operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, created_at, user_id, strict, limit, offset } = req.method == "GET" ? req.query : req.body.whereValues;
        const updateValues: {} = req.body.updateValues;

        console.log("updateValues :", updateValues);

        const rows = await executeQuery(prepareQuery("UPDATE", "operations", { id, operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, created_at, user_id, strict, limit, offset }, undefined, updateValues));

        console.log(rows);
        if (rows === null) {
            res.status(500).json({"error": "verifying the parameters passed in the url"});
        } else {
            res.status(200).json(rows);
        }
    }


    /**
     * Delete operations with parameters
     * @param type Type of http request (GET or POST)
     * @param req HTTP Request
     * @param res HTTP Response
     * @returns {TEXT} 200 - success if the operation has been deleted
     * @returns {TEXT} 500 - Error if the operation could not be deleted
     */
    async function deleteOperation(req: Request, res: Response): Promise<void> {
        const { id, operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, user_id, strict } = req.method == "GET" ? req.query : req.body;
        const rows = await executeQuery(prepareQuery("DELETE", "operations", { id, operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, user_id, strict }));
        
        console.log(rows);
        if (rows === null) {
            res.status(500).json({"error": "verifying the parameters passed in the url"});
        } else {
            res.status(200).json(rows);
        }
    }
}
