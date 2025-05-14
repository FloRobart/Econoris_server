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
 *         operations_destination:
 *           type: string
 *           example: "Dest A"
 *         operations_costs:
 *           type: number
 *           example: 10.00
 *         operations_category:
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
 *                 enum: ["id","date","name","amount","source","destination","costs","category","validated","redundancy","operations_id","operations_date","operations_name","operations_amount","operations_source","operations_destination","operations_costs","operations_category","operations_validated","operations_redundancy"]
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



/*========*/
/* Select */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     OperationRequestBodySelect:
 *       type: object
 *       properties:
 *         keys:
 *           type: array
 *           items:
 *             type: string
 *             enum: ["id","date","name","amount","source","destination","costs","category","validated","redundancy","operations_id","operations_date","operations_name","operations_amount","operations_source","operations_destination","operations_costs","operations_category","operations_validated","operations_redundancy"]
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
 *                 enum: ["id","date","name","amount","source","destination","costs","category","validated","redundancy","operations_id","operations_date","operations_name","operations_amount","operations_source","operations_destination","operations_costs","operations_category","operations_validated","operations_redundancy"]
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



/*========*/
/* Insert */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     OperationRequestBodyInsert:
 *       type: object
 *       required:
 *         - keys
 *         - values
 *       properties:
 *         returnedKeys:
 *           type: array
 *           items:
 *             type: string
 *             enum: ["*", "id","date","name","amount","source","destination","costs","category","validated","redundancy","operations_id","operations_date","operations_name","operations_amount","operations_source","operations_destination","operations_costs","operations_category","operations_validated","operations_redundancy"]
 *         insertions:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - date
 *               - name
 *               - amount
 *             properties:
 *               date:
 *                 type: string
 *               name:
 *                 type: string
 *               amount:
 *                 type: integer
 *               source:
 *                 type: string
 *               destination:
 *                 type: string
 *               costs:
 *                 type: integer
 *               category:
 *                 type: string
 *               validated:
 *                 type: boolean
 *               redundancy:
 *                 type: string
 *     OperationRequestBodyInsert2:
 *       type: object
 *       required:
 *         - keys
 *         - values
 *       properties:
 *         returnedKeys:
 *           type: array
 *           items:
 *             type: string
 *             enum: ["*", "id","date","name","amount","source","destination","costs","category","validated","redundancy","operations_id","operations_date","operations_name","operations_amount","operations_source","operations_destination","operations_costs","operations_category","operations_validated","operations_redundancy"]
 *         keys:
 *           type: array
 *           items:
 *             type: string
 *             enum: ["date","name","amount","source","destination","costs","category","validated","redundancy","operations_date","operations_name","operations_amount","operations_source","operations_destination","operations_costs","operations_category","operations_validated","operations_redundancy"]
 *         values:
 *           type: array
 *           items:
 *             type: array
 *             items:
 *               oneOf:
 *                 - type: string
 *                 - type: integer
 */



/*========*/
/* Update */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     OperationRequestBodyUpdate:
 *       type: object
 *       required:
 *         - keys
 *         - whereValues
 *       properties:
 *         keysValues:
 *           type: object
 *           required:
 *             - date
 *             - name
 *             - amount
 *           properties:
 *             date:
 *               type: string
 *             name:
 *               type: string
 *             amount:
 *               type: integer
 *             source:
 *               type: string
 *             destination:
 *               type: string
 *             costs:
 *               type: integer
 *             category:
 *               type: string
 *             validated:
 *               type: boolean
 *             redundancy:
 *               type: string
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
 *                 enum: ["id","date","name","amount","source","destination","costs","category","validated","redundancy","operations_id","operations_date","operations_name","operations_amount","operations_source","operations_destination","operations_costs","operations_category","operations_validated","operations_redundancy"]
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



/*========*/
/* Delete */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     OperationRequestBodyDelete:
 *       $ref: "#/components/schemas/OperationsWhereValues"
 */



/*==========*/
/* Response */
/*==========*/
/**
 * @swagger
 * components:
 *   schemas:
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
 *           example: []
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: []
 */
