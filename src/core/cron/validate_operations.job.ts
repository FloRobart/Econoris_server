import { AppError } from '../models/AppError.model';
import { selectAllOperationsInvalidate, updateBulkOperationsValidate } from '../../modules/operations/operations.service';
import { OperationsUpdateSchema } from '../../modules/operations/operations.schema';



/**
 * Generate missing operations for all active subscriptions.
 * @throws AppError if there is an issue during the job execution.
 */
export async function validateOperationsJob(): Promise<void> {
    try {
        const invalidateOperations = await selectAllOperationsInvalidate();
        const operationToUpdate = OperationsUpdateSchema.array().parse(invalidateOperations);

        if (operationToUpdate.length <= 0) {
            return;
        }

        await updateBulkOperationsValidate(operationToUpdate, true);
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to generate subscription operations", 500);
    }
}
