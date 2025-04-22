import { Express, Request, Response } from "express";
import * as SelectController from "../controllers/SelectController";
import { QueryTable } from "../models/types";



/**
 * Initialyse Operations routes
 * @param app Express application
 * @returns void
 */
export function initOperationsRoutes(app: Express): void {
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
        const table: QueryTable = "operations";
        const jsonRequest = SelectController.parseSelectUrl(table, req.query);
        const jsonResponse = await SelectController.executeSelect(table, jsonRequest);

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length == 0 && jsonResponse.warnings.length == 0) ? 204 : 200)).json(jsonResponse);
    });

    /**
     * @swagger
     * /operation/{id}:
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
     *               type: array
     *               items:
     *                 $ref: "#components/schemas/Operations"
     *       204:
     *         description: No results found in database
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
     *               $ref: "#/components/schemas/OperationResponseBodyEmpty"
     */
    app.get('/operation/:id', async (req: Request, res: Response) => {
        const table: QueryTable = "operations";
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
     *               type: array
     *               items:
     *                 $ref: "#components/schemas/Operations"
     *       204:
     *         description: No results found in database
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
     *               $ref: "#/components/schemas/OperationResponseBodyEmpty"
     */
    app.post('/operations/get', async (req: Request, res: Response) => {
        const table: QueryTable = "operations";
        const jsonRequest = SelectController.correctedJsonSelectRequest(table, req.body);
        const jsonResponse = await SelectController.executeSelect(table, jsonRequest);

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length == 0 && jsonResponse.warnings.length == 0) ? 204 : 200)).json(jsonResponse);
    });


    /*========*/
    /* Create */
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
     *         description: Operations to create. One array = One operation
     *         required: true
     *         schema:
     *           type: array
     *           items:
     *             $ref: "#/components/schemas/OperationRequestBodyCreate"
     *     responses:
     *       200:
     *         description: Operations created
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: "#components/schemas/Operations"
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

    });

    /**
     * @swagger
     * /operation:
     *   post:
     *     summary: Create only one operation
     *     tags:
     *       - Operations
     *     parameters:
     *       - in: body
     *         name: operations
     *         description: Operation to create.
     *         required: true
     *         schema:
     *           $ref: "#/components/schemas/OperationRequestBodyCreate"
     *     responses:
     *       200:
     *         description: Operations created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#components/schemas/Operations"
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
    app.post('/operation', async (req: Request, res: Response) => {

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
     *               type: array
     *               items:
     *                 $ref: "#components/schemas/Operations"
     *       204:
     *         description: No operations updated
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
    app.put('/operations', async (req: Request, res: Response) => {

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
