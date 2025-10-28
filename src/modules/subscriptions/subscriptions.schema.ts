import { z, ZodDate, ZodNumber } from "zod";



/*========*/
/* SELECT */
/*========*/
export const SubscriptionsSchema = z.object({
    id: z.int().min(1),
    label: z.string().min(1).max(255),
    amount: z.number(),
    category: z.string().min(1).max(255),
    source: z.string().max(255).nullable(),
    destination: z.string().max(255).nullable(),
    costs: z.number().default(0.0),
    active: z.boolean().default(true),

    interval_value: z.int().min(1).default(1),
    interval_unit: z.enum(['days', 'weeks', 'months']).default('months'),
    start_date: z.date(),
    end_date: z.date().nullable().default(null),
    day_of_month: z.int().min(0).max(31).nullable().default(1),

    user_id: z.int().min(1),

    created_at: z.date().readonly(),
    updated_at: z.date().readonly(),
});



/*========*/
/* INSERT */
/*========*/
export const SubscriptionsInsertSchema = SubscriptionsSchema.extend({
    user_id: SubscriptionsSchema.shape.user_id.optional(),

    start_date: z.preprocess<unknown, ZodDate>(
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
export const SubscriptionsIdUpdateSchema = z.object({
    id: z.preprocess<unknown, ZodNumber>(
        (val) => typeof val === "string" ? Number(val.trim()) : val,
        z.int().min(1),
    ),
});

export const SubscriptionsUpdateSchema = SubscriptionsInsertSchema.extend({
    id: SubscriptionsSchema.shape.id,
});



/*========*/
/* DELETE */
/*========*/
export const SubscriptionsIdDeleteSchema = SubscriptionsIdUpdateSchema;
