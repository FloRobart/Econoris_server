import { z } from "zod";



/*========*/
/* SELECT */
/*========*/
export const OperationsSchema = z.object({
    id: z.int().min(1),
    levy_date: z.date(),
    label: z.string().trim().min(1).max(255),
    amount: z.number(),
    category: z.string().trim().min(1).max(255),

    source: z.string().trim().max(255).nullable(),
    destination: z.string().trim().max(255).nullable(),
    costs: z.number(),
    validated: z.boolean(),

    user_id: z.int().min(1),
    subscription_id: z.int().min(1).nullable(),

    created_at: z.date(),
    updated_at: z.date(),
});



/*========*/
/* INSERT */
/*========*/
export const OperationsInsertSchema = OperationsSchema.extend({
    user_id: OperationsSchema.shape.user_id.optional(),
}).omit({
    id: true,

    subscription_id: true,

    created_at: true,
    updated_at: true,
});



/*========*/
/* UPDATE */
/*========*/
export const OperationsIdUpdateSchema = z.object({
    id: z.string()
        .trim()
        .regex(/^[0-9]+$/)
        .refine((val) => {
            const n = Number(val);
            return Number.isInteger(n) && n > 0;
        }),
});

export const OperationsUpdateSchema = OperationsInsertSchema;



/*========*/
/* DELETE */
/*========*/
export const OperationsIdDeleteSchema = OperationsIdUpdateSchema;
