import z from "zod";



/**
 * Schéma de validation pour l'en-tête 'Authorization' contenant un JWT.
 * Le format attendu est 'Bearer <token>'.
 */
export const AuthorizationHeaderSchema = z.string().trim().regex(/^Bearer\s[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/);
