import { Request, Response, NextFunction } from "express";
import { AppError } from "../../models/AppError.model";
import { AuthorizationHeaderSchema, UserSafeSchema } from "../../../modules/auth/auth.schema";
import { UserSafe } from "../../../modules/auth/auth.types";
import AppConfig from "../../../config/AppConfig";
import axios from "axios";



/**
 * Middleware de validation de la clé 'Authorization' dans les headers.
 * @param schema Schéma Zod à utiliser pour la validation.
 * @throws AppError avec statut 400 si la validation échoue.
 */
export const authorizationValidator = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authHeader = AuthorizationHeaderSchema.parse(req.headers.authorization);
        const token = authHeader.split(" ")[1];

        const user: UserSafe = await getUserFromAPI(token);
        req.body = { ...req.body, user };
        next();
    } catch (error) {
        next(error instanceof AppError ? error : new AppError("Invalid Authorization header", 401));
    }
};

/**
 * Récupère l'utilisateur via l'API d'authentification.
 * @param token Le token d'authentification
 * @throws AppError si la réponse HTTP n'est pas 200
 */
async function getUserFromAPI(token: string): Promise<UserSafe> {
    try {
        const response = await axios.get(AppConfig.auth_app_url + "/users", {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status !== 200) {
            throw new AppError("Invalid user token", response.status);
        }
        return UserSafeSchema.parse(response.data);
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        const status = error?.response?.status || 500;
        throw new AppError("Error retrieving user information", status);
    }
}