import { Router } from "express";
import {
    getOperationsSeveral,
    postOperationsSeveral,
    putOperationsSeveral,
    deleteOperationsSeveral,
} from "../controllers/operationSeveralController";



const router = Router();



/*========*/
/* Select */
/*========*/
/**
 * @
 * /operations/get:
 *   post:
 *     summary: Get all operations corresponding at parameters passed in body of the request
 *     tags:
 *       - "Multiple Operations"
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
router.post('/get', getOperationsSeveral);



/*========*/
/* Insert */
/*========*/
/**
 * @
 * /operations:
 *   post:
 *     summary: Create one or multiple operations
 *     tags:
 *       - "Multiple Operations"
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
router.post('/', postOperationsSeveral);



/*========*/
/* Update */
/*========*/
/**
 * @
 * /operations:
 *   put:
 *     summary: Update one or multiple operations
 *     tags:
 *       - "Multiple Operations"
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
router.put('/', putOperationsSeveral);



/*========*/
/* Delete */
/*========*/
/**
 * @
 * /operations:
 *   delete:
 *     summary: Delete operations
 *     tags:
 *       - "Multiple Operations"
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
router.delete('/', deleteOperationsSeveral);



export default router;