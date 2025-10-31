import { Request, Response, NextFunction } from 'express';
import * as LoansService from './loans.service';
import { LoanInsert, LoanUpdate } from './loans.types';



/*========*/
/* SELECT */
/*========*/
/**
 * Get all loans for a user.
 * @param req.body.user The user object containing the user ID.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const selectLoans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;

        const loans = await LoansService.selectLoans(userId);
        res.status(loans.length ? 200 : 204).json(loans);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* INSERT */
/*========*/
/**
 * Insert a new loan for a user.
 * @param req.body.user The user object containing the user ID.
 * @param req.body.validatedData.body The validated loan data to insert.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const insertLoans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loanData: LoanInsert = { ...req.body.validatedData.body, user_id: req.body.user.id };

        const newLoan = await LoansService.insertLoans(loanData);
        res.status(201).json(newLoan);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* UPDATE */
/*========*/
/**
 * Update an existing loan for a user.
 * @param req.body.user The user object containing the user ID.
 * @param req.body.validatedData.body The validated loan data to update.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const updateLoans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loanData: LoanUpdate = { ...req.body.validatedData.body, id: req.body.validatedData.params.id, user_id: req.body.user.id };

        const loans = await LoansService.updateLoans(loanData);
        res.status(200).json(loans);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* DELETE */
/*========*/
/**
 * Delete an loan for a user.
 * @param req.body.user The user object containing the user ID.
 * @param req.body.validatedData.params.id The ID of the loan to delete.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const deleteLoans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;
        const loanId: number = req.body.validatedData.params.id;

        const loans = await LoansService.deleteLoans(userId, loanId);
        res.status(200).json(loans);
    } catch (error) {
        next(error);
    }
};
