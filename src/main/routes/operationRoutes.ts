import { Router } from "express";
import {
    getOperations,
    getOperationsById,
    postOperations,
    putOperations,
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
 *     description: Get all operations
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


/*========*/
/* Insert */
/*========*/
/**
 * @swagger
 * /operations:
 *   post:
 *     summary: Create one operation
 *     tags:
 *       - Operations
 *     parameters:
 *       - in: body
 *         name: operation
 *         description: Operation to create.
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/Operations"
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
 *     summary: Update one operation
 *     tags:
 *       - Operations
 *     parameters:
 *       - in: body
 *         name: operations
 *         description: Operations to update.
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/Operations"
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