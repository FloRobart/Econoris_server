import { Router } from "express";
import * as OperationsController from "./operations.controller";
import { bodyValidator } from "../../core/middlewares/validators/body_validator.middleware";
import { OperationsIdDeleteSchema, OperationsIdUpdateSchema, OperationsInsertSchema, OperationsUpdateSchema } from "./operations.schema";
import { paramsQueryValidator } from "../../core/middlewares/validators/params_query_validator.middleware";



const router = Router();



/*========*/
/* SELECT */
/*========*/
/**
 * @swagger
 * /operations:
 *   get:
 *     tags:
 *       - Operations
 *     summary: Retrieve a list of operations of the authenticated user
 *     description: Retrieve a list of operations associated with the authenticated user.
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *     responses:
 *       200:
 *         description: A list of operations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Operations'
 *       204:
 *         description: No content. No operations found.
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error401'
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.get('/', OperationsController.selectOperations);


/*========*/
/* INSERT */
/*========*/
/**
 * @swagger
 * /operations:
 *   post:
 *     tags:
 *       - Operations
 *     summary: Create a new operation for the authenticated user
 *     description: Create a new operation associated with the authenticated user.
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *       - in: body
 *         name: operation
 *         required: true
 *         description: Operation object that needs to be added
 *         schema:
 *           $ref: '#/components/schemas/OperationsInsert'
 *     responses:
 *       201:
 *         description: Created operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Operations'
 *       400:
 *         description: Bad request. Please check the input data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error400'
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error401'
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.post('/', bodyValidator(OperationsInsertSchema), OperationsController.insertOperations);


/*========*/
/* UPDATE */
/*========*/
/**
 * @swagger
 * /operations:
 *   put:
 *     tags:
 *       - Operations
 *     summary: Update an existing operation for the authenticated user
 *     description: Update an existing operation associated with the authenticated user.
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: body
 *         name: operation
 *         required: true
 *         description: Operation object that needs to be updated
 *         schema:
 *           $ref: '#/components/schemas/OperationsUpdate'
 *     responses:
 *       200:
 *         description: Updated operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Operations'
 *       400:
 *         description: Bad request. Please check the input data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error400'
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error401'
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.put('/:id', paramsQueryValidator(OperationsIdUpdateSchema), bodyValidator(OperationsUpdateSchema), OperationsController.updateOperations);


/*========*/
/* DELETE */
/*========*/
/**
 * @swagger
 * /operations:
 *   delete:
 *     tags:
 *       - Operations
 *     summary: Delete an existing operation for the authenticated user
 *     description: Delete an existing operation associated with the authenticated user.
 *     parameters:
 *       - in: headers
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Deleted operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Operations'
 *       400:
 *         description: Bad request. Please check the input data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error400'
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error401'
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 */
router.delete('/:id', paramsQueryValidator(OperationsIdDeleteSchema), OperationsController.deleteOperations);



export default router;