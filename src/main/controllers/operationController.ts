import { Request, Response, NextFunction } from 'express';
import { JSONResponse, OperationsType, QueryTable } from '../utils/types';
import { createJsonResponse } from '../database/parser';
import * as SelectController from "../database/severalOperations/parseSeveralSelect";
import * as OperationDatabase from "../database/OperationDatabase";
import * as DeleteController from "../database/severalOperations/parseSeveralDelete";
import { User } from '../models/UserModels';
import { executeQuery } from '../database/database';
import * as logger from '../utils/logger';



const table: QueryTable = "operations";



/*========*/
/* Select */
/*========*/
export const getOperations = async (req: Request, res: Response, next: NextFunction) => {
    /* If you modify this code, also modify the Swagger documentation and unit tests */
    try {
        const user: User = req.body.user;
        const jsonRequest = SelectController.parseSelectUrl(table, req.query, user);

        let jsonResponse: JSONResponse;
        if (jsonRequest.errors.length > 0) {
            jsonResponse = createJsonResponse([], jsonRequest.warnings, jsonRequest.errors);
        } else {
            jsonResponse = await SelectController.executeSelect(table, jsonRequest);
        }

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length == 0 && jsonResponse.warnings.length == 0) ? 204 : 200)).json(jsonResponse);
    } catch (error) {
        next(error);
    }
}

export const getOperationsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        const user: User = req.body.user;
        const jsonRequest = SelectController.parseSelectUrl(table, { ...req.params, ...req.query }, user);

        let jsonResponse: JSONResponse;
        if (jsonRequest.errors.length > 0) {
            jsonResponse = createJsonResponse([], jsonRequest.warnings, jsonRequest.errors);
        } else {
            jsonResponse = await SelectController.executeSelect(table, jsonRequest);
        }

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length == 0 && jsonResponse.warnings.length == 0) ? 204 : 200)).json(jsonResponse);
    } catch (error) {
        next(error);
    }
}


/*========*/
/* Insert */
/*========*/
export const postOperations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.debug("Request body : ", req.body);
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        const user: User = req.body.user;
        const operation: OperationsType = req.body.operation as OperationsType;

        if (!operation) {
            res.status(400).json(createJsonResponse([], [], ["The operation object is required in the request body"]));
            return;
        }

        const jsonResponse: JSONResponse = createJsonResponse();

        jsonResponse.rows = await executeQuery(OperationDatabase.getInsertQuery(table, operation, user.userid)) || [];

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length === 0 && jsonResponse.warnings.length === 0) ? 204 : 200)).json(jsonResponse);
    } catch (error) {
        next(error);
    }
}



/*========*/
/* Update */
/*========*/
export const putOperationsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        const user: User = req.body.user;
        const operation: OperationsType = req.body.operation as OperationsType;

        if (!operation) {
            res.status(400).json(createJsonResponse([], [], ["The operation object is required in the request body"]));
            return;
        }

        const jsonResponse: JSONResponse = createJsonResponse();

        jsonResponse.rows = await executeQuery(OperationDatabase.getUpdateQuery(table, operation, user.userid)) || [];

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length === 0 && jsonResponse.warnings.length === 0) ? 204 : 200)).json(jsonResponse);
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
        const jsonRequest = DeleteController.parseDeleteUrl(table, { ...req.params }, user);

        let jsonResponse: JSONResponse;
        if (jsonRequest.errors.length > 0) {
            jsonResponse = createJsonResponse([], jsonRequest.warnings, jsonRequest.errors);
        } else {
            jsonResponse = await DeleteController.executeDelete(table, jsonRequest);
        }

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length === 0 && jsonResponse.warnings.length === 0) ? 204 : 200)).json(jsonResponse);
    } catch (error) {
        next(error);
    }
}