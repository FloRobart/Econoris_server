import { Express, Request, Response } from "express";
import { createOperation, deleteOperation, getOperations, updateOperation } from "../controllers/OperationsController";



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
     *               $ref: "#/components/schemas/Error"
     */
    app.get('/operations', async (req: Request, res: Response) => { getOperations(req, res); });

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
     *               $ref: "#/components/schemas/Error"
     */
    app.post('/operations/get', async (req: Request, res: Response) => { getOperations(req, res); });


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
    app.post('/operations', async (req: Request, res: Response) => { createOperation(req, res); });

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
    app.post('/operation', async (req: Request, res: Response) => { createOperation(req, res); });


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
    app.put('/operations', async (req: Request, res: Response) => { updateOperation(req, res); });


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
    app.delete('/operations', async (req: Request, res: Response) => { deleteOperation(req, res); });
}
