import { z } from "zod";



/*========*/
/* SELECT */
/*========*/
export const LoansSchema = z.object({
    id: z.int().min(1),
    loan_date: z.date(),
    amount: z.number(),
    refunded_amount: z.number().min(0),

    borrower: z.string().trim().min(1).max(255),
    reason: z.string().trim().min(1).max(255),

    user_id: z.int().min(1),

    created_at: z.date(),
    updated_at: z.date(),
});



/*========*/
/* INSERT */
/*========*/
export const LoansInsertSchema = LoansSchema.extend({
    user_id: LoansSchema.shape.user_id.optional(),
    loan_date: z.string().min(1).refine((val) => {
        return !isNaN(Date.parse(val));
    }).transform((val) => {
        return new Date(val);
    }),
}).omit({
    id: true,

    created_at: true,
    updated_at: true,
});



/*========*/
/* UPDATE */
/*========*/
export const LoansIdUpdateSchema = z.object({
    id: z.string()
        .trim()
        .regex(/^[0-9]+$/)
        .refine((val) => {
            const n = Number(val);
            return Number.isInteger(n) && n > 0;
        }),
});

export const LoansUpdateSchema = LoansInsertSchema.extend({
    id: LoansSchema.shape.id,
});



/*========*/
/* DELETE */
/*========*/
export const LoansIdDeleteSchema = LoansIdUpdateSchema;
