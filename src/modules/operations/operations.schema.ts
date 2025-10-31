import { z, ZodDate, ZodNumber } from "zod";



/*========*/
/* SELECT */
/*========*/
export const OperationsSchema = z.object({
    id: z.int().min(1),
    levy_date: z.date().default(new Date()),
    label: z.string().trim().min(1).max(255),
    amount: z.number(),
    category: z.string().trim().min(1).max(255),

    source: z.string().trim().max(255).nullable().default(null),
    destination: z.string().trim().max(255).nullable().default(null),
    costs: z.number().default(0.0),
    validated: z.boolean().default(false),

    user_id: z.int().min(1),
    subscription_id: z.int().min(1).nullable().default(null),

    created_at: z.date().readonly(),
    updated_at: z.date().readonly(),
});



/*========*/
/* INSERT */
/*========*/
export const OperationsInsertSchema = OperationsSchema.extend({
    user_id: OperationsSchema.shape.user_id.optional(),
    levy_date: z.preprocess<unknown, ZodDate>(
        (val) => typeof val === "string" ? new Date(val) : val,
        z.date(),
    ),
}).omit({
    id: true,

    created_at: true,
    updated_at: true,
});



/*========*/
/* UPDATE */
/*========*/
export const OperationsIdUpdateSchema = z.object({
    id: z.preprocess<unknown, ZodNumber>(
        (val) => typeof val === "string" ? Number(val.trim()) : val,
        z.int().min(1),
    ),
});

export const OperationsUpdateSchema = OperationsInsertSchema.extend({
    id: OperationsSchema.shape.id,
});



/*========*/
/* DELETE */
/*========*/
export const OperationsIdDeleteSchema = OperationsIdUpdateSchema;
