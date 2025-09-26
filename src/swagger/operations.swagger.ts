/**
 * @swagger
 * components:
 *   schemas:
 *     Operations:
 *       type: object
 *       required:
 *         - operations_date
 *         - operations_name
 *         - operations_amount
 *         - operations_category
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
