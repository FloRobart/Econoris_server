import { Router } from "express";
import {
    getOperations,
    getOperationsById,
    getOperationsComplexe,
    postOperations,
    putOperations,
    deleteOperations,
    deleteOperationsById
} from "../controllers/operationController";



const router = Router();



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
router.get('/', getOperations);

/**
 * @swagger
 * /operations/id/{id}:
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
router.get('/id/:id', getOperationsById);

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
router.post('/get', getOperationsComplexe);



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
router.post('/', postOperations);



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
router.put('/', putOperations);



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
router.delete('/', deleteOperations);

/**
 * @swagger
 * /operations/id/{id}:
 *   delete:
 *     summary: Delete operations
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
router.delete('/id/:id', deleteOperationsById);



export default router;