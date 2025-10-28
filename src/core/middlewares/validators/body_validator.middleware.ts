import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../../models/AppError.model";
import * as logger from "../../utils/logger";



/**
 * Middleware générique de validation du corps de la requête avec Zod.
 * @param schema Schéma Zod à utiliser pour la validation.
 * @returns Middleware Express avec req.body.validated contenant les données validées.
 * @throws AppError avec statut 400 si la validation échoue.
 */
export const bodyValidator = (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = { ...req.body, validatedData: { ...req.body.validatedData, body: schema.parse(req.body) } };
        logger.debug("Body validated :", req.body);
        next();
    } catch (error) {
        logger.debug("Body validation error :", error);
        next(new AppError("Invalid request data", 400));
    }
};