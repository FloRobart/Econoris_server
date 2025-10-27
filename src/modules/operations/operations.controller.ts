import { Request, Response, NextFunction } from 'express';
import * as OperationsService from './operations.service';



/*========*/
/* SELECT */
/*========*/
export const selectOperations = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.user.id;

    try {
        const operations = await OperationsService.selectOperations(userId);
        res.status(operations.length ? 200 : 204).json(operations);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* INSERT */
/*========*/
export const insertOperations = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.user.id;
    const operationData = req.body.validated.body;

    try {
        const newOperation = await OperationsService.insertOperations(userId, operationData);
        res.status(201).json(newOperation);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* UPDATE */
/*========*/
export const updateOperations = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.user.id;
    const operationData = { ...req.body.validated.body, id: req.body.validated.params.id };


    try {
        const operations = await OperationsService.updateOperations(userId, operationData);
        res.status(200).json(operations);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* DELETE */
/*========*/
export const deleteOperations = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.user.id;
    const operationId = req.body.validated.params.id;

    try {
        const operations = await OperationsService.deleteOperations(userId, operationId);
        res.status(200).json(operations);
    } catch (error) {
        next(error);
    }
};
