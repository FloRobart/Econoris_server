import { Request, Response, NextFunction } from 'express';
import { JSONResponse, QueryTable } from '../utils/types';
import { createJsonResponse } from '../database/parser';
import * as SelectController from "../database/parseSelect";
import * as InsertController from "../database/parseInsert";
import * as UpdateController from "../database/parseUpdate";
import * as DeleteController from "../database/parseDelete";



const table: QueryTable = "operations";



/*========*/
/* Select */
/*========*/
export const getOperations = async (req: Request, res: Response, next: NextFunction) => {
    /* If you modify this code, also modify the Swagger documentation and unit tests */
    // TODO : Verify the authorization token here (http to floraccess with the token [req.headers['authorization'].split(' ')[1];])
    try {
        const user = { id: req.headers['authorization']?.split(' ')[1]};
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
        // TODO : Verify the authorization token here (http to floraccess with the token [req.headers['authorization'].split(' ')[1];])
        const user = { id: req.headers['authorization']?.split(' ')[1]};
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

export const getOperationsComplexe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        // TODO : Verify the authorization token here (http to floraccess with the token [req.headers['authorization'].split(' ')[1];])
        const user = { id: req.headers['authorization']?.split(' ')[1]};
        const jsonRequest = SelectController.parseJsonSelectRequest(table, req.body, user);

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
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        // TODO : Verify the authorization token here (http to floraccess with the token [req.headers['authorization'].split(' ')[1];])
        const user = { id: req.headers['authorization']?.split(' ')[1]};
        const jsonRequest = InsertController.parseJsonInsertRequest(table, req.body, user);

        let jsonResponse: JSONResponse;
        if (jsonRequest.errors.length > 0) {
            jsonResponse = createJsonResponse([], jsonRequest.warnings, jsonRequest.errors);
        } else {
            jsonResponse = await InsertController.executeInsert(table, jsonRequest);
        }

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length === 0 && jsonResponse.warnings.length === 0) ? 204 : 200)).json(jsonResponse);
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
        // TODO : Verify the authorization token here (http to floraccess with the token [req.headers['authorization'].split(' ')[1];])
        const user = { id: req.headers['authorization']?.split(' ')[1]};
        const jsonRequest = UpdateController.parseJsonUpdateRequest(table, req.body, user);

        let jsonResponse: JSONResponse;
        if (jsonRequest.errors.length > 0) {
            jsonResponse = createJsonResponse([], jsonRequest.warnings, jsonRequest.errors);
        } else {
            jsonResponse = await UpdateController.executeUpdate(table, jsonRequest);
        }

        res.status(jsonResponse.errors.length > 0 ? 500 : ((jsonResponse.rows.length === 0 && jsonResponse.warnings.length === 0) ? 204 : 200)).json(jsonResponse);
    } catch (error) {
        next(error);
    }
}



/*========*/
/* Delete */
/*========*/
export const deleteOperations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        // TODO : Verify the authorization token here (http to floraccess with the token [req.headers['authorization'].split(' ')[1];])
        const user = { id: req.headers['authorization']?.split(' ')[1]};
        const jsonRequest = DeleteController.parseJsonDeleteRequest(table, req.body, user);

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

export const deleteOperationsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* If you modify this code, also modify the Swagger documentation and unit tests */
        // TODO : Verify the authorization token here (http to floraccess with the token [req.headers['authorization'].split(' ')[1];])
        const user = { id: req.headers['authorization']?.split(' ')[1]};
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