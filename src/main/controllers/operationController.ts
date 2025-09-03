import { Request, Response, NextFunction } from 'express';
import { QueryTable } from '../utils/types';
import { JsonHttpResponse, createJsonResponse } from '../models/JsonHttpResponse';
import * as OperationsDao from '../database/operationsDao';
import { User } from '../models/UserModels';
import { Operations } from '../models/OperationsModel';



const table: QueryTable = "operations";



/*========*/
/* Select */
/*========*/
export const getOperations = async (req: Request, res: Response, next: NextFunction) => {
    /* If you modify this code, also modify the Swagger documentation and unit tests */
    try {
        const user: User = req.body.user;
        const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 0;
        const offset: number | null = req.query.offset ? parseInt(req.query.offset as string) : null;

        OperationsDao.selectOperations(user.userid, limit, offset).then((operations) => {
            const jsonResponse: JsonHttpResponse = createJsonResponse(operations);

            res.status(operations.length > 0 ? 200 : 204).json(jsonResponse);
        }).catch((error) => {
            next(error);
        });
    } catch (error) {
        next(error);
    }
}

export const getOperationsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        const user: User = req.body.user;
        const id: number = req.params.id ? parseInt(req.params.id) : -1;
        const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 0;
        const offset: number | null = req.query.offset ? parseInt(req.query.offset as string) : null;

        OperationsDao.selectOperations(user.userid, limit, offset, { operations_id: id }).then((operations) => {
            const jsonResponse: JsonHttpResponse = createJsonResponse(operations);

            res.status(operations.length > 0 ? 200 : 204).json(jsonResponse);
        }).catch((error) => {
            next(error);
        });
    } catch (error) {
        next(error);
    }
}



/*========*/
/* Insert */
/*========*/
export const postOperations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        const user: User = req.body.user;
        const operation: Operations = req.body.operation;

        if (!operation || Object.keys(operation).length === 0 || !operation.operations_id) {
            const jsonResponse: JsonHttpResponse = createJsonResponse([], [], ["No operation provided"]);
            res.status(400).json(jsonResponse);
            return;
        }
        
        OperationsDao.insertOperation(user.userid, operation).then((insertedOperation) => {
            const jsonResponse: JsonHttpResponse = createJsonResponse(insertedOperation !== null ? [insertedOperation] : [], [], insertedOperation === null ? ["Failed inserting operation into database"] : []);

            res.status(insertedOperation !== null ? 200 : 500).json(jsonResponse);
        }).catch((error) => {
            next(error);
        });
    } catch (error) {
        next(error);
    }
}



/*========*/
/* Update */
/*========*/
export const putOperations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        const user: User = req.body.user;
        const operation = req.body.operation;

        if (!operation || Object.keys(operation).length === 0 || !operation.operations_id) {
            const jsonResponse: JsonHttpResponse = createJsonResponse([], [], ["No operation provided"]);
            res.status(400).json(jsonResponse);
            return;
        }

        OperationsDao.updateOperation(user.userid, operation).then((updatedOperation) => {
            const jsonResponse: JsonHttpResponse = createJsonResponse(updatedOperation !== null ? [updatedOperation] : [], [], updatedOperation === null ? ["Failed updating operation in database"] : []);

            res.status(updatedOperation !== null ? 200 : 500).json(jsonResponse);
        }).catch((error) => {
            next(error);
        });
    } catch (error) {
        next(error);
    }
}



/*========*/
/* Delete */
/*========*/
export const deleteOperationsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        const user: User = req.body.user;
        const operations_id = req.params.id ? parseInt(req.params.id) : -1;

        OperationsDao.deleteOperationById(user.userid, operations_id).then((success) => {
            const jsonResponse: JsonHttpResponse = createJsonResponse([], [], success ? [] : ["Failed deleting operation from database"]);

            res.status(success ? 200 : 400).json(jsonResponse);
        }).catch((error) => {
            next(error);
        });
    } catch (error) {
        next(error);
    }
}