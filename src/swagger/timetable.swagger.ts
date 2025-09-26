/**
 * @swagger
 * components:
 *   schemas:
 *     Timetable:
 *       type: object
 *       required:
 *         - timetable_timetabledate
 *         - timetable_hoursnumber
 *       properties:
 *         timetable_id
 *           type: number
 *           minimum: 1
 *           example: 1
 *         timetable_timetabledate
 *           type: string
 *           example: "2023-09-30"
 *         timetable_hoursnumber
 *           type: number
 *           example: 8
 *         timetable_hourlyrate
 *           type: number
 *           minimum: 0.1
 *           example: 15.5
 *         timetable_createdat
 *           type: string
 *           example: "2023-09-30T12:00:00Z"
 *         timetable_userid
 *           type: number
 *           minimum: 1
 *           example: 1
 */



/*==========*/
/* Response */
/*==========*/
/**
 * @swagger
 * components:
 *   schemas:
 *     TimetableResponseBody:
 *       type: object
 *       properties:
 *         rows:
 *           type: array
 *           items:
 *             $ref: "#components/schemas/Timetable"
 *         warnings:
 *           type: array
 *           items:
 *             type: string
 *             Description: "Description of the warnings -> action executed"
 *             example: "Logical operator : 'example' not in [AND,OR] for key : 'id' -> replaced by 'AND'"
 *         errors:
 *           $ref: "#components/schemas/Error"
 *     TimetableResponseBodyEmpty:
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
