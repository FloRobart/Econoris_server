/*======*/
/* Tags */
/*======*/
/**
 * @swagger
 * tags:
 *   - name: Operations
 *     description: All about Operations
 *   - name: Loans
 *     description: All about Loans
 */



/*========*/
/* Tables */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Tables:
 *       type: string
 *       enum: [operations, loans, timetable]
 *       example: "operations"
 */



/*============*/
/* Operations */
/*============*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Operations:
 *       type: object
 *       properties:
 *         operations_id:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         operations_date:
 *           type: string
 *           example: "2023-09-30T22:00:00.000Z"
 *         operations_name:
 *           type: string
 *           example: "Operation A"
 *         operations_amount:
 *           type: number
 *           example: 100.50
 *         operations_source:
 *           type: string
 *           example: "Source A"
 *         operations_dest:
 *           type: string
 *           example: "Dest A"
 *         operations_costs:
 *           type: number
 *           example: 10.00
 *         operations_categ:
 *           type: string
 *           example: "Category A"
 *         operations_validated:
 *           type: boolean
 *           example: true
 *         operations_redundancy:
 *           type: string
 *           example: "???"
 *         operations_createdat:
 *           type: string
 *           example: "2023-09-31T22:00:00.000Z"
 *     OperationRequestBodySelect:
 *       type: object
 *       properties:
 *         keys:
 *           type: array
 *           items:
 *             type: string
 *             enum: ["id","date","name","amount","source","dest","costs","categ","validated","redundancy","operations_id","operations_date","operations_name","operations_amount","operations_source","operations_dest","operations_costs","operations_categ","operations_validated","operations_redundancy"]
 *         aggregation:
 *           type: string
 *           enum: [SUM, AVG, COUNT, MIN, MAX]
 *           example: SUM
 *         limit:
 *           type: integer
 *         offset:
 *           type: integer
 *         whereValues:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - key
 *               - value
 *             properties:
 *               key:
 *                 type: string
 *                 enum: ["id","date","name","amount","source","dest","costs","categ","validated","redundancy","operations_id","operations_date","operations_name","operations_amount","operations_source","operations_dest","operations_costs","operations_categ","operations_validated","operations_redundancy"]
 *               comparisonOperator:
 *                 type: string
 *                 enum: ["=", "!=", "<>", "<", ">", "<=", ">=", "LIKE"]
 *                 example: "="
 *               value:
 *                 type: string
 *               logicalOperator:
 *                 type: string
 *                 enum: [AND, OR]
 *                 example: AND
 *     OperationRequestBodyCreate:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/OperationsKeysValues"
 *     OperationRequestBodyUpdate:
 *       type: object
 *       required:
 *         - keys
 *         - whereValues
 *       properties:
 *         keys:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/OperationsKeysValues"
 *         whereValues:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - key
 *               - value
 *             properties:
 *               key:
 *                 type: string
 *                 enum: ["id","date","name","amount","source","dest","costs","categ","validated","redundancy","operations_id","operations_date","operations_name","operations_amount","operations_source","operations_dest","operations_costs","operations_categ","operations_validated","operations_redundancy"]
 *               comparisonOperator:
 *                 type: string
 *                 enum: ["=", "!=", "<>", "<", ">", "<=", ">=", "LIKE"]
 *                 example: "="
 *               value:
 *                 type: string
 *               logicalOperator:
 *                 type: string
 *                 enum: [AND, OR]
 *                 example: AND
 *     OperationRequestBodyDelete:
 *       $ref: "#/components/schemas/OperationsWhereValues"
 *     OperationResponseBody:
 *       type: object
 *       properties:
 *         rows:
 *           type: array
 *           items:
 *             $ref: "#components/schemas/Operations"
 *         warnings:
 *           type: array
 *           items:
 *             type: string
 *             Description: "Description of the warnings -> action executed"
 *             example: "Logical operator : 'example' not in [AND,OR] for key : 'id' -> replaced by 'AND'"
 *         errors:
 *           $ref: "#components/schemas/Error"
 *     OperationResponseBodyEmpty:
 *       type: object
 *       properties:
 *         rows:
 *           type: array
 *           items:
 *             type: string
 *           example: []
 *         warnings:
 *           type: array
 *           items:
 *             type: string
 *             Description: "Description of the warnings -> action executed"
 *             example: "Logical operator : 'example' not in [AND,OR] for key : 'id' -> replaced by 'AND'"
 *         errors:
 *           $ref: "#components/schemas/Error"
 *     OperationsKeysValues:
 *       type: object
 *       required:
 *         - key
 *         - value
 *       properties:
 *         key:
 *           type: string
 *           enum: ["date","name","amount","source","dest","costs","categ","validated","redundancy","operations_date","operations_name","operations_amount","operations_source","operations_dest","operations_costs","operations_categ","operations_validated","operations_redundancy"]
 *         value:
 *           oneOf:
 *             - type: string
 *             - type: integer
 *     OperationsWhereValues:
 *       type: object
 *       required:
 *         - whereValues
 *       properties:
 *         whereValues:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - key
 *               - value
 *             properties:
 *               key:
 *                 type: string
 *                 enum: ["id","date","name","amount","source","dest","costs","categ","validated","redundancy","operations_id","operations_date","operations_name","operations_amount","operations_source","operations_dest","operations_costs","operations_categ","operations_validated","operations_redundancy"]
 *               comparisonOperator:
 *                 type: string
 *                 enum: ["=", "!=", "<>", "<", ">", "<=", ">=", "LIKE"]
 *                 example: "="
 *               value:
 *                 type: string
 *               logicalOperator:
 *                 type: string
 *                 enum: [AND, OR]
 *                 example: AND
 */



/*=======*/
/* Loans */
/*=======*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Loans:
 *       type: object
 *       properties:
 *         loans_id:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         loans_date:
 *           type: string
 *           example: "2023-09-30T22:00:00.000Z"
 *         loans_borrower:
 *           type: string
 *           example: "John Doe"
 *         loans_amount:
 *           type: string
 *           example: "1000.00"
 *         loans_refundedamount:
 *           type: string
 *           example: "500.00"
 *         loans_loanreason:
 *           type: string
 *           example: "Loan reason"
 *         loans_createdat:
 *           type: string
 *           example: "2023-09-30T22:00:00.000Z"
 */



/*===========*/
/* Timetable */
/*===========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Timetable:
 *       type: object
 *       properties:
 *         timetable_id:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         timetable_timetabledate:
 *           type: string
 *           example: "2023-09-30T22:00:00.000Z"
 *         timetable_hoursnumber:
 *           type: ???
 *         timetable_hourlyrate:
 *           type: ???
 *         timetable_createdat:
 *           type: ???
 */



/*============*/
/* All Tables */
/*============*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: array
 *       items:
 *         type: string
 *         example: "???"
 */