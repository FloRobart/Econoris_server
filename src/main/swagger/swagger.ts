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
 *         example: "Error message"
 */