/*========*/
/* SELECT */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Loans:
 *       type: object
 *       required:
 *         - id
 *         - loan_date
 *         - amount
 *         - refunded_amount
 *         - borrower
 *         - reason
 *         - user_id
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: number
 *           exemple: 1
 *         loan_date:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 *         amount:
 *           type: number
 *           exemple: 100.00
 *         refunded_amount:
 *           type: number
 *           exemple: 50.00
 *         borrower:
 *           type: string
 *           exemple: "Bob"
 *         reason:
 *           type: string
 *           exemple: "Car repair"
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
 *     LoansInsert:
 *       type: object
 *       required:
 *         - loan_date
 *         - amount
 *         - refunded_amount
 *         - borrower
 *         - reason
 *       properties:
 *         loan_date:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 *         amount:
 *           type: number
 *           exemple: 100.00
 *         refunded_amount:
 *           type: number
 *           exemple: 50.00
 *         borrower:
 *           type: string
 *           exemple: "Bob"
 *         reason:
 *           type: string
 *           exemple: "Car repair"
 */


/*========*/
/* UPDATE */
/*========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     LoansUpdate:
 *       type: object
 *       required:
 *         - loan_date
 *         - amount
 *         - refunded_amount
 *         - borrower
 *         - reason
 *       properties:
 *         loan_date:
 *           type: string
 *           exemple: "2024-01-01T00:00:00.000Z"
 *         amount:
 *           type: number
 *           exemple: 100.00
 *         refunded_amount:
 *           type: number
 *           exemple: 50.00
 *         borrower:
 *           type: string
 *           exemple: "Bob"
 *         reason:
 *           type: string
 *           exemple: "Car repair"
 */
