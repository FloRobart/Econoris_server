import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../../models/AppError.model";
import { AuthorizationHeaderSchema } from "../../../modules/auth/auth.schema";
import { UserSafe } from "../../../modules/auth/auth.types";



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
        const user: UserSafe = {
            id: Number(token.split(".")[0]),
            email: "",
            pseudo: "",
            auth_methods_id: 0,
            is_connected: false,
            is_verified_email: false,
            last_login: new Date(),
            created_at: new Date(),
            updated_at: new Date()
        }; // Mock user extraction from token

        req.body = { ...req.body, user };

        next();
    } catch (error) {
        next(error instanceof AppError ? error : new AppError("Invalid Authorization header", 401));
    }
};