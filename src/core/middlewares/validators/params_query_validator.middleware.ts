import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../../models/AppError.model";



/**
 * Middleware générique de validation du corps de la requête avec Zod.
 * @param schema Schéma Zod à utiliser pour la validation.
 * @returns Middleware Express avec req.body.validated contenant les données validées.
 * @throws AppError avec statut 400 si la validation échoue.
 */
export const paramsQueryValidator = (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = { ...req.body, validatedData: { ...req.body.validatedData, params: schema.parse({ ...req.params, ...req.query }) } };
        next();
    } catch (error) {
        next(new AppError("Invalid request data", 400));
    }
};