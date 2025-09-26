import { Request, Response, NextFunction } from 'express';
import { JsonHttpResponse, createJsonResponse } from '../models/JsonHttpResponse';
import * as OperationsDao from '../database/operationsDao';
import { User } from '../models/UserModels';
import { Operations } from '../models/OperationsModel';
import * as logger from '../utils/logger';
import { AppError } from '../models/ErrorModel';

/*========*/
/* Select */
/*========*/
export const getTimetable = async (req: Request, res: Response, next: NextFunction) => {
    /* If you modify this code, also modify the Swagger documentation and unit tests */
    try {
        const user: User = req.body.user;
        const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 0;
        const offset: number | null = req.query.offset ? parseInt(req.query.offset as string) : null;

        OperationsDao.selectOperations(user.userid, limit, offset).then((operations) => {
            const jsonResponse: JsonHttpResponse = createJsonResponse(operations);

            res.status(operations.length > 0 ? 200 : 204).json(jsonResponse);
        }).catch((err) => {
            logger.error(err);
            next(new AppError());
        });
    } catch (err) {
        logger.error(err);
        next(new AppError());
    }
}