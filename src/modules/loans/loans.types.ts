import { z } from "zod";
import { LoansSchema, LoansInsertSchema, LoansUpdateSchema, LoansIdUpdateSchema, LoansIdDeleteSchema } from "./loans.schema";


/* SELECT */
export type Loan = z.infer<typeof LoansSchema>;

/* INSERT */
export type LoanInsert = z.infer<typeof LoansInsertSchema>;

/* UPDATE */
export type LoansIdUpdate = z.infer<typeof LoansIdUpdateSchema>;
export type LoanUpdate = z.infer<typeof LoansUpdateSchema>;

/* DELETE */
export type LoansIdDelete = z.infer<typeof LoansIdDeleteSchema>;
