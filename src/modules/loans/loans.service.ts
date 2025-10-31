import { Loan, LoanInsert, LoanUpdate } from './loans.types';
import * as LoansRepository from './loans.repository';
import { LoansSchema } from './loans.schema';
import { ZodError } from 'zod';
import { AppError } from '../../core/models/AppError.model';


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
        const loans = await LoansRepository.selectLoans(userId);
        return LoansSchema.array().parse(loans);
    } catch (error) {
        throw error;
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
        const loans = await LoansRepository.insertLoans(loanData);
        return LoansSchema.parse(loans);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse loan (loan inserted successfully)", 500) : error;
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
        const loans = await LoansRepository.updateLoans(loanData);
        return LoansSchema.parse(loans);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse loan (loan updated successfully)", 500) : error;
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
        const loans = await LoansRepository.deleteLoans(userId, loanId);
        return LoansSchema.parse(loans);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse loan (loan deleted successfully)", 500) : error;
    }
}
