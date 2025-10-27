/*========*/
/* SELECT */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Operations:
 *       type: object
 *       required:
 *         - id
 *         - levy_date
 *         - label
 *         - amount
 *         - category
 *         - source
 *         - destination
 *         - costs
 *         - validated
 *         - user_id
 *         - subscription_id
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: number
 *           exemple: 1
 *         levy_date:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 *         label:
 *           type: string
 *           exemple: "Sample Operation"
 *         amount:
 *           type: number
 *           exemple: 100.00
 *         category:
 *           type: string
 *           exemple: "Income"
 *         source:
 *           type: string
 *           exemple: "Job"
 *         destination:
 *           type: string
 *           exemple: "Bank"
 *         costs:
 *           type: number
 *           exemple: 2.50
 *         validated:
 *           type: boolean
 *           exemple: true
 *         user_id:
 *           type: number
 *           exemple: 1
 *         subscription_id:
 *           type: number|null
 *           exemple: 1
 *         created_at:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 *         updated_at:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 */


/*========*/
/* INSERT */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     OperationsInsert:
 *       type: object
 *       required:
 *         - levy_date
 *         - label
 *         - amount
 *         - category
 *         - source
 *         - destination
 *         - costs
 *         - validated
 *       properties:
 *         levy_date:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 *         label:
 *           type: string
 *           exemple: "Sample Operation"
 *         amount:
 *           type: number
 *           exemple: 100.00
 *         category:
 *           type: string
 *           exemple: "Income"
 *         source:
 *           type: string
 *           exemple: "Job"
 *         destination:
 *           type: string
 *           exemple: "Bank"
 *         costs:
 *           type: number
 *           exemple: 2.50
 *         validated:
 *           type: boolean
 *           exemple: true
 */


/*========*/
/* UPDATE */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     OperationsUpdate:
 *       type: object
 *       required:
 *         - levy_date
 *         - label
 *         - amount
 *         - category
 *         - source
 *         - destination
 *         - costs
 *         - validated
 *       properties:
 *         levy_date:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 *         label:
 *           type: string
 *           exemple: "Sample Operation"
 *         amount:
 *           type: number
 *           exemple: 100.00
 *         category:
 *           type: string
 *           exemple: "Income"
 *         source:
 *           type: string
 *           exemple: "Job"
 *         destination:
 *           type: string
 *           exemple: "Bank"
 *         costs:
 *           type: number
 *           exemple: 2.50
 *         validated:
 *           type: boolean
 *           exemple: true
 */
