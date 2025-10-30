/*========*/
/* SELECT */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Subscriptions:
 *       type: object
 *       required:
 *         - id
 *         - label
 *         - amount
 *         - category
 *         - source
 *         - destination
 *         - costs
 *         - active
 *         - interval_value
 *         - interval_unit
 *         - start_date
 *         - end_date
 *         - day_of_month
 *         - last_generated_at
 *         - user_id
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: number
 *           exemple: 1
 *         label:
 *           type: string
 *           exemple: "Sample Subscription"
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
 *         active:
 *           type: boolean
 *           exemple: true
 *         interval_value:
 *           type: number
 *           exemple: 1
 *         interval_unit:
 *           type: string
 *           enum: ["days", "weeks", "months"]
 *           exemple: "months"
 *         start_date:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 *         end_date:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 *         day_of_month:
 *           type: number
 *           exemple: 15
 *         last_generated_at:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 *         user_id:
 *           type: number
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
 *     SubscriptionsInsert:
 *       type: object
 *       required:
 *         - label
 *         - amount
 *         - category
 *         - interval_value
 *         - interval_unit
 *         - start_date
 *       properties:
 *         id:
 *           type: number
 *           exemple: 1
 *         label:
 *           type: string
 *           exemple: "Sample Subscription"
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
 *         active:
 *           type: boolean
 *           exemple: true
 *         interval_value:
 *           type: number
 *           exemple: 1
 *         interval_unit:
 *           type: string
 *           enum: ["days", "weeks", "months"]
 *           exemple: "months"
 *         start_date:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 *         end_date:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 */


/*========*/
/* UPDATE */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     SubscriptionsUpdate:
 *       type: object
 *       required:
 *         - label
 *         - amount
 *         - category
 *         - interval_value
 *         - interval_unit
 *         - start_date
 *       properties:
 *         id:
 *           type: number
 *           exemple: 1
 *         label:
 *           type: string
 *           exemple: "Sample Subscription"
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
 *         active:
 *           type: boolean
 *           exemple: true
 *         interval_value:
 *           type: number
 *           exemple: 1
 *         interval_unit:
 *           type: string
 *           enum: ["days", "weeks", "months"]
 *           exemple: "months"
 *         start_date:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 *         end_date:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 */
