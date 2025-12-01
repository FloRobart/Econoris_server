import z from "zod";



/*=========*/
/* Headers */
/*=========*/
/**
 * Schéma de validation pour l'en-tête 'Authorization' contenant un JWT.
 * Le format attendu est 'Bearer token'.
 */
export const AuthorizationHeaderSchema = z.string().trim().regex(/^Bearer\s[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/);


/*======*/
/* User */
/*======*/
/**
 * Schéma de validation pour un email, avec prétraitement pour normaliser l'email.
 */
const EmailSchema = z.preprocess(
    (val) => typeof val === "string" ? val.toLowerCase().replace(/\s+/g, "") : val,
    z.email()
);

/**
 * Schéma de validation pour un pseudo.
 */
const PseudoSchema = z.string().trim().min(3).max(255);

/**
 * Schéma de validation pour un utilisateur "safe" (sans informations sensibles).
 */
export const UserSafeSchema = z.object({
    id: z.int().min(1),
    email: EmailSchema,
    pseudo: PseudoSchema,

    auth_methods_id: z.int().min(1),
    is_connected: z.boolean(),
    is_verified_email: z.boolean(),
    last_logout_at: z.string().nonempty(),

    created_at: z.string().nonempty(),
});