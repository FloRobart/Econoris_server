import { Express, Request, Response } from "express";
import { createJsonResponse } from "../controllers/Controller";
import * as SelectController from "../controllers/SelectController";
import * as InsertController from "../controllers/InsertController";
import * as UpdateController from "../controllers/UpdateController";
import { QueryTable, JSONResponse } from "../models/types";



/**
 * Initialyse Operations routes
 * @param app Express application
 * @returns void
 */
export function initOperationsRoutes(app: Express): void {
    const table: QueryTable = "operations";

    /*========*/
    /* Select */
    /*========*/
    /**
     * @swagger
     * /operations:
     *   get:
     *     summary: Get all operations
     *     description: Get all operations; You can filter the results with the parameters in the query string
     *     tags:
     *       - Operations
     *     parameters:
     *       - in: query
     *         name: limit
     *         description: Limit the number of results
     *         required: false
     *         example: 10
     *         schema:
     *           type: integer
     *       - in: query
     *         name: offset
     *         description: Offset the results
     *         required: false
     *         example: 0
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: List of operations
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#components/schemas/OperationResponseBody"
     *       204:
     *         description: No results found in database
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#components/schemas/OperationResponseBodyEmpty"
     *       400:
     *         description: Bad request. Change your request for to fix this error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Error"
     *       500:
     *         description: Internal server error. Please create an issue on Github
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/OperationResponseBodyEmpty"
     */
    app.get('/operations', async (req: Request, res: Response) => {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        const jsonRequest = SelectController.parseSelectUrl(table, req.query);
        const jsonResponse = await SelectController.executeSelect(table, jsonRequest);

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length == 0 && jsonResponse.warnings.length == 0) ? 204 : 200)).json(jsonResponse);
    });

    /**
     * @swagger
     * /operation/id/{id}:
     *   get:
     *     summary: Get operation with id
     *     tags:
     *       - Operations
     *     parameters:
     *       - in: path
     *         name: id
     *         description: ID of the operation
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 1
     *       - in: query
     *         name: limit
     *         description: Limit the number of results
     *         required: false
     *         example: 10
     *         schema:
     *           type: integer
     *       - in: query
     *         name: offset
     *         description: Offset the results
     *         required: false
     *         example: 0
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: List of operations
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#components/schemas/OperationResponseBody"
     *       204:
     *         description: No results found in database
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#components/schemas/OperationResponseBodyEmpty"
     *       400:
     *         description: Bad request. Change your request for to fix this error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Error"
     *       500:
     *         description: Internal server error. Please create an issue on Github
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/OperationResponseBodyEmpty"
     */
    app.get('/operation/id/:id', async (req: Request, res: Response) => {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        const jsonRequest = SelectController.parseSelectUrl(table, { ...req.params, ...req.query });
        const jsonResponse = await SelectController.executeSelect(table, jsonRequest);

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length == 0 && jsonResponse.warnings.length == 0) ? 204 : 200)).json(jsonResponse);
    });

    /**
     * @swagger
     * /operations/get:
     *   post:
     *     summary: Get all operations corresponding at parameters passed in body of the request
     *     tags:
     *       - Operations
     *     parameters:
     *       - in: body
     *         schema:
     *           $ref: "#/components/schemas/OperationRequestBodySelect"
     *     responses:
     *       200:
     *         description: List of operations
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#components/schemas/OperationResponseBody"
     *       204:
     *         description: No results found in database
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#components/schemas/OperationResponseBodyEmpty"
     *       400:
     *         description: Bad request. Change your request for to fix this error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Error"
     *       500:
     *         description: Internal server error. Please create an issue on Github
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/OperationResponseBodyEmpty"
     */
    app.post('/operations/get', async (req: Request, res: Response) => {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        const jsonRequest = SelectController.correctedJsonSelectRequest(table, req.body);
        const jsonResponse = await SelectController.executeSelect(table, jsonRequest);

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length == 0 && jsonResponse.warnings.length == 0) ? 204 : 200)).json(jsonResponse);
    });


    /*========*/
    /* Insert */
    /*========*/
    /**
     * @swagger
     * /operations:
     *   post:
     *     summary: Create one or multiple operations
     *     tags:
     *       - Operations
     *     parameters:
     *       - in: body
     *         name: operations
     *         description: |
     *           Operations to create
     *           <br>
     *           You can create multiple operations at once as follows: {keys: ["key1", "key2"], values: [["value1-forKey1", "value2-forKey2"], ["value3-forKey1", "value4-forKey2"]]}. The keys and values must be in the same order.
     *         required: true
     *         schema:
     *           $ref: "#/components/schemas/OperationRequestBodyInsert"
     *     responses:
     *       200:
     *         description: Operations created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#components/schemas/OperationResponseBody"
     *       204:
     *         description: Operations created but no operations returned
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#components/schemas/OperationResponseBodyEmpty"
     *       400:
     *         description: Bad request. Change your request for to fix this error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Error"
     *       500:
     *         description: Internal server error. Please create an issue on Github
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Error"
     */
    app.post('/operations', async (req: Request, res: Response) => {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        const jsonRequest = InsertController.correctedJsonInsertRequest(table, req.body);
        const jsonResponse = await InsertController.executeInsert(table, jsonRequest);

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length === 0 && jsonResponse.warnings.length === 0) ? 204 : 200)).json(jsonResponse);
    });


    /*========*/
    /* Update */
    /*========*/
    /**
     * @swagger
     * /operations:
     *   put:
     *     summary: Update one or multiple operations
     *     tags:
     *       - Operations
     *     parameters:
     *       - in: body
     *         name: operations
     *         description: Operations to update.
     *         required: true
     *         schema:
     *           $ref: "#/components/schemas/OperationRequestBodyUpdate"
     *     responses:
     *       200:
     *         description: Operations updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#components/schemas/OperationResponseBody"
     *       204:
     *         description: No results found in database
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#components/schemas/OperationResponseBodyEmpty"
     *       400:
     *         description: Bad request. Change your request for to fix this error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Error"
     *       500:
     *         description: Internal server error. Please create an issue on Github
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/OperationResponseBodyEmpty"
     */
    app.put('/operations', async (req: Request, res: Response) => {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        const jsonRequest = UpdateController.correctedJsonUpdateRequest(table, req.body);
        let jsonResponse: JSONResponse;
        if (jsonRequest.errors.length > 0) {
            jsonResponse = createJsonResponse([], jsonRequest.warnings, jsonRequest.errors);
        } else {
            jsonResponse = await UpdateController.executeUpdate(table, jsonRequest);
        }

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length === 0 && jsonResponse.warnings.length === 0) ? 204 : 200)).json(jsonResponse);
    });


    /*========*/
    /* Delete */
    /*========*/
    /**
     * @swagger
     * /operations:
     *   delete:
     *     summary: Delete operations
     *     tags:
     *       - Operations
     *     parameters:
     *       - in: body
     *         name: operations
     *         description: Operations to delete
     *         required: true
     *         schema:
     *           $ref: "#/components/schemas/OperationRequestBodyDelete"
     *     responses:
     *       200:
     *         description: Operations deleted
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: "#components/schemas/Operations"
     *       204:
     *         description: No operations deleted
     *         content:
     *           application/json:
     *             schema:
     *              type: array
     *              items:
     *                type: string
     *              example: []
     *       400:
     *         description: Bad request. Change your request for to fix this error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Error"
     *       500:
     *         description: Internal server error. Please create an issue on Github
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Error"
     */
    app.delete('/operations', async (req: Request, res: Response) => {

    });
}
