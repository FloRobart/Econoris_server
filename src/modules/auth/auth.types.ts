import z from "zod";
import { AuthorizationHeaderSchema, UserSafeSchema } from "./auth.schema";



/* Headers */
export type AuthorizationHeader = z.infer<typeof AuthorizationHeaderSchema>;

/* User */
export type UserSafe = z.infer<typeof UserSafeSchema>;