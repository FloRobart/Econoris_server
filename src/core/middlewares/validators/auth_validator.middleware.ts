import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../../models/AppError.model";
import { AuthorizationHeaderSchema } from "../../../modules/auth/auth.schema";



/**
 * Middleware de validation de la clé 'Authorization' dans les headers.
 * @param schema Schéma Zod à utiliser pour la validation.
 * @throws AppError avec statut 400 si la validation échoue.
 */
export const authorizationValidator = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authHeader = AuthorizationHeaderSchema.parse(req.headers.authorization);
        const token = authHeader.split(" ")[1];
        // TODO: const user = await AuthService.verifyToken(token);
        const user = { id: token.split(".")[0] }; // Mock user extraction from token
        req.body = { ...req.body, user };

        next();
    } catch (error) {
        next(error instanceof AppError ? error : new AppError("Invalid Authorization header", 401));
    }
};