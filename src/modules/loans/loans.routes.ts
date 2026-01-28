import { Router } from "express";
import * as LoansController from "./loans.controller";
import { bodyValidator } from "../../core/middlewares/validators/body_validator.middleware";
import { LoansIdDeleteSchema, LoansIdUpdateSchema, LoansInsertSchema } from "./loans.schema";
import { paramsQueryValidator } from "../../core/middlewares/validators/params_query_validator.middleware";



const router = Router();



/*========*/
/* SELECT */
/*========*/
/**
 * @swagger
 * /loans:
 *   get:
 *     tags:
 *       - Loans
 *     summary: Retrieve a list of loans of the authenticated user
 *     description: Retrieve a list of loans associated with the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of loans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loans'
 *       204:
 *         description: No content. No loans found.
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
router.get('/', LoansController.selectLoans);


/*========*/
/* INSERT */
/*========*/
/**
 * @swagger
 * /loans:
 *   post:
 *     tags:
 *       - Loans
 *     summary: Create a new loan for the authenticated user
 *     description: Create a new loan associated with the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoansInsert'
 *     responses:
 *       201:
 *         description: Created loan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loans'
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
router.post('/', bodyValidator(LoansInsertSchema), LoansController.insertLoans);


/*========*/
/* UPDATE */
/*========*/
/**
 * @swagger
 * /loans:
 *   put:
 *     tags:
 *       - Loans
 *     summary: Update an existing loan for the authenticated user
 *     description: Update an existing loan associated with the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoansUpdate'
 *     responses:
 *       200:
 *         description: Updated loan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loans'
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
router.put('/:id', paramsQueryValidator(LoansIdUpdateSchema), bodyValidator(LoansInsertSchema), LoansController.updateLoans);


/*========*/
/* DELETE */
/*========*/
/**
 * @swagger
 * /loans:
 *   delete:
 *     tags:
 *       - Loans
 *     summary: Delete an existing loan for the authenticated user
 *     description: Delete an existing loan associated with the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Deleted loan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loans'
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
router.delete('/:id', paramsQueryValidator(LoansIdDeleteSchema), LoansController.deleteLoans);



export default router;