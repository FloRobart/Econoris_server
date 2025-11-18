import { AuthorizationHeader, UserSafe } from "../../../src/modules/auth/auth.types";
import { ZodError } from "zod";
import { AuthorizationHeaderSchema, UserSafeSchema } from "../../../src/modules/auth/auth.schema";



/**
 * Users Schemas tests
 */
describe('Users Schemas tests', () => {
    /*========*/
    /* SELECT */
    /*========*/
    /* UserSafe Schema */
    describe('User Safe schema', () => {
        it('Correct UserSafe schema', () => {
            for (const data of CorrectUserSafeSchema) {
                expect(UserSafeSchema.parse(data)).toStrictEqual(BaseUserSafeSchema);
                expect(() => UserSafeSchema.parse(data)).not.toThrow();
            }
        });

        it('Incorrect UserSafe schema', () => {
            for (const data of IncorrectUserSafeSchema) {
                expect(() => UserSafeSchema.parse(data)).toThrow(ZodError);
            }
        });
    });

    /* Authorization Header Schema */
    describe('Authorization Header schema', () => {
        it('Correct Authorization Header schema', () => {
            for (const data of CorrectAuthorizationHeaderSchema) {
                expect(() => AuthorizationHeaderSchema.parse(data)).not.toThrow();
                expect(AuthorizationHeaderSchema.parse(data)).toStrictEqual(CorrectAuthorizationHeaderSchema[0]);
            }
        });

        it('Incorrect Authorization Header schema', () => {
            for (const data of IncorrectAuthorizationHeaderSchema) {
                expect(() => AuthorizationHeaderSchema.parse(data)).toThrow(ZodError);
            }
        });
    });
});



/*========*/
/* SELECT */
/*========*/
/* UserSafe Schema */
const BaseUserSafeSchema: UserSafe = {
    id: 1,
    email: "test1@test.fr",
    pseudo: "Pseudo",

    auth_methods_id: 1,
    is_connected: true,
    is_verified_email: true,
    last_logout_at: new Date().toISOString(),

    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

const CorrectUserSafeSchema: UserSafe[] = [
    BaseUserSafeSchema,
];

const IncorrectUserSafeSchema: any[] = [
    {
        ...BaseUserSafeSchema,
        id: "1", // should be integer
    },{
        ...BaseUserSafeSchema,
        id: -5, // should be positive
    },{
        ...BaseUserSafeSchema,
        id: 1.5, // should be integer
    },{
        ...BaseUserSafeSchema,
        id: 0, // should be >= 1
    },{
        ...BaseUserSafeSchema,
        id: null, // should be number
    },{
        ...BaseUserSafeSchema,
        id: undefined, // should be number
    },{
        ...BaseUserSafeSchema,
        email: "invalid-email", // should be valid email
    },{
        ...BaseUserSafeSchema,
        pseudo: "Ps", // should be >= 3 characters
    },{
        ...BaseUserSafeSchema,
        auth_methods_id: "1", // should be integer
    },{
        ...BaseUserSafeSchema,
        auth_methods_id: -3, // should be positive
    },{
        ...BaseUserSafeSchema,
        auth_methods_id: 2.7, // should be integer
    },{
        ...BaseUserSafeSchema,
        auth_methods_id: 0, // should be >= 1
    },{
        ...BaseUserSafeSchema,
        auth_methods_id: null, // should be number
    },{
        ...BaseUserSafeSchema,
        auth_methods_id: undefined, // should be number
    },{
        ...BaseUserSafeSchema,
        is_connected: "true", // should be boolean
    },{
        ...BaseUserSafeSchema,
        is_connected: 0, // should be boolean
    },{
        ...BaseUserSafeSchema,
        is_verified_email: "false", // should be boolean
    },{
        ...BaseUserSafeSchema,
        is_verified_email: 0, // should be boolean
    },{
        ...BaseUserSafeSchema,
        last_logout_at: "", // should be non-empty string
    },{
        ...BaseUserSafeSchema,
        last_logout_at: 123456789, // should be string
    },{
        ...BaseUserSafeSchema,
        created_at: "", // should be non-empty string
    },{
        ...BaseUserSafeSchema,
        created_at: 123456789, // should be string
    },{
        ...BaseUserSafeSchema,
        updated_at: "", // should be non-empty string
    },{
        ...BaseUserSafeSchema,
        updated_at: 123456789, // should be string
    },
];


/* Authorization Header Schema */
const CorrectAuthorizationHeaderSchema: AuthorizationHeader[] = [
    "Bearer abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz",
    " Bearer abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz ",
    "   Bearer abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz",
    "Bearer abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz   ",
];

const IncorrectAuthorizationHeaderSchema: any[] = [
    "Bearer", // missing token
    "Bearer ", // missing token
    "Bearer abcdefghijklmnopqrstuvwxyz", // incomplete token
    " abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz", // missing 'Bearer'
    "Bearerabcdefg hijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz", // space in token
    "Bearer  abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz", // double space after 'Bearer'
    "Token abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz", // wrong prefix
    "", // empty string
    "   ", // spaces only
    123456, // should be string
    null, // should be string
    undefined, // should be string
];
