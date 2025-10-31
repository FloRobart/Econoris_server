import { AppError } from "../../core/models/AppError.model";
import { Database } from "../../core/models/Database.model";
import { Loan, LoanInsert, LoanUpdate } from "./loans.types";
import * as logger from '../../core/utils/logger';



/*========*/
/* SELECT */
/*========*/
/**
 * Get all loans for a user.
 * @param userId The ID of the user.
 * @returns An array of Loan objects.
 * @throws AppError if there is an issue retrieving the loans.
 */
export async function selectLoans(userId: number): Promise<Loan[]> {
    try {
        let query = "SELECT * FROM loans WHERE user_id = $1;";
        let values = [userId];

        const loans = await Database.execute<Loan>({ text: query, values: values });

        /* Automatic conversion of amount and refunded_amount fields to Number */
        loans.forEach(loan => {
            if (typeof loan.amount === 'string') loan.amount = Number(loan.amount);
            if (typeof loan.refunded_amount === 'string') loan.refunded_amount = Number(loan.refunded_amount);
        });

        return loans
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to retrieve loans", 500);
    }
}


/*========*/
/* INSERT */
/*========*/
/**
 * Insert a new loan for a user.
 * @param loanData The loan data to insert.
 * @returns The newly created Loan object.
 * @throws AppError if there is an issue inserting the loan.
 */
export async function insertLoans(loanData: LoanInsert): Promise<Loan> {
    try {
        const keys = Object.keys(loanData);
        const columns = keys.join(", ");
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

        const values = keys.map(key => (loanData as any)[key]);
        const query = `INSERT INTO loans (${columns}) VALUES (${placeholders}) RETURNING *;`;

        const rows = await Database.execute<Loan>({ text: query, values: values });
        if (rows.length === 0) { throw new AppError("No loan inserted", 500); }

        /* Automatic conversion of amount and refunded_amount fields to Number */
        const result = { ...rows[0] };
        if (typeof result.amount === 'string') result.amount = Number(result.amount);
        if (typeof result.refunded_amount === 'string') result.refunded_amount = Number(result.refunded_amount);

        return result;
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to insert loans", 500);
    }
}


/*========*/
/* UPDATE */
/*========*/
/**
 * Update an existing loan for a user.
 * @param loanData The loan data to update.
 * @returns The updated Loan object.
 */
export async function updateLoans(loanData: LoanUpdate): Promise<Loan> {
    try {
        /* Extract id and user_id, prepare fields to update */
        const { id, user_id, ...fieldsToUpdate } = loanData;
        const keys = Object.keys(fieldsToUpdate);

        if (!id || !user_id || keys.length === 0) {
            throw new AppError("Missing data to update", 400);
        }

        /* Build SET clause and values */
        const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
        const values = keys.map(key => (fieldsToUpdate as any)[key]);

        /* Append id and user_id to values for WHERE clause */
        const query = `UPDATE loans SET ${setClause} WHERE id = $${values.length + 1} AND user_id = $${values.length + 2} RETURNING *;`;
        values.push(id, user_id);

        /* Execute query */
        const rows = await Database.execute<Loan>({ text: query, values });
        if (rows.length === 0) { throw new AppError("No loan updated", 404); }

        /* Automatic conversion of amount and refunded_amount fields to Number */
        const result = { ...rows[0] };
        if (typeof result.amount === 'string') result.amount = Number(result.amount);
        if (typeof result.refunded_amount === 'string') result.refunded_amount = Number(result.refunded_amount);

        return result;
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to update loans", 500);
    }
}


/*========*/
/* DELETE */
/*========*/
/**
 * Delete an loan for a user.
 * @param userId The ID of the user.
 * @param loanId The ID of the loan to delete.
 * @returns The deleted Loan object.
 * @throws AppError if there is an issue deleting the loan.
 */
export async function deleteLoans(userId: number, loanId: number): Promise<Loan> {
    try {
        const query = `DELETE FROM loans WHERE id = $1 AND user_id = $2 RETURNING *;`;
        const values = [loanId, userId];

        const rows = await Database.execute<Loan>({ text: query, values });
        if (rows.length === 0) { throw new AppError("No loan deleted", 404); }

        /* Automatic conversion of amount and refunded_amount fields to Number */
        const result = { ...rows[0] };
        if (typeof result.amount === 'string') result.amount = Number(result.amount);
        if (typeof result.refunded_amount === 'string') result.refunded_amount = Number(result.refunded_amount);

        return result;
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to delete loans", 500);
    }
}
