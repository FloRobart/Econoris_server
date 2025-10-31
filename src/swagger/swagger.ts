/**
 * @swagger
 * components:
 *   schemas:
 *     error400:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           example: "Invalid data"
 *     error401:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           example: "Unauthorized"
 *     error404:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           example: "User not found"
 *     error500:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           example: "Internal server error"
 */