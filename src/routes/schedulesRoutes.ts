import { Router } from "express";



const router = Router();



/*========*/
/* Select */
/*========*/
/**
 * @swagger
 * /timetable:
 *   get:
 *     summary: Get all timetable entries
 *     description: Get all timetable entries
 *     tags:
 *       - Timetable
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Limit the number of results
 *         required: false
 *         example: 10
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         description: Offset the results
 *         required: false
 *         example: 0
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of operations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/schemas/TimetableResponseBody"
 *       204:
 *         description: No results found in database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#components/schemas/TimetableResponseBodyEmpty"
 *       400:
 *         description: Bad request. Change your request for to fix this error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       500:
 *         description: Internal server error. Please create an issue on Github
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TimetableResponseBodyEmpty"
 */
router.get('/', getTimetable);



export default router;