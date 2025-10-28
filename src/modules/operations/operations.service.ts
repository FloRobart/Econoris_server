import { Operation, OperationInsert, OperationUpdate } from './operations.types';
import * as OperationsRepository from './operations.repository';
import { OperationsSchema } from './operations.schema';
import { ZodError } from 'zod';
import { AppError } from '../../core/models/AppError.model';



/*========*/
/* SELECT */
/*========*/
/**
 * Get all operations for a user.
 * @param userId The ID of the user.
 * @returns An array of Operation objects.
 * @throws AppError if there is an issue retrieving the operations.
 */
export async function selectOperations(userId: number): Promise<Operation[]> {
    try {
        const operations = await OperationsRepository.selectOperations(userId);
        return OperationsSchema.array().parse(operations);
    } catch (error) {
        throw error;
    }
}


/*========*/
/* INSERT */
/*========*/
/**
 * Insert a new operation for a user.
 * @param operationData The operation data to insert.
 * @returns The newly created Operation object.
 * @throws AppError if there is an issue inserting the operation.
 */
export async function insertOperations(operationData: OperationInsert): Promise<Operation> {
    try {
        const operations = await OperationsRepository.insertOperations(operationData);
        return OperationsSchema.parse(operations);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse operation (operation inserted successfully)", 500) : error;
    }
}


/*========*/
/* UPDATE */
/*========*/
/**
 * Update an existing operation for a user.
 * @param operationData The operation data to update.
 * @returns The updated Operation object.
 */
export async function updateOperations(operationData: OperationUpdate): Promise<Operation> {
    try {
        const operations = await OperationsRepository.updateOperations(operationData);
        return OperationsSchema.parse(operations);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse operation (operation updated successfully)", 500) : error;
    }
}


/*========*/
/* DELETE */
/*========*/
/**
 * Delete an operation for a user.
 * @param userId The ID of the user.
 * @param operationId The ID of the operation to delete.
 * @returns The deleted Operation object.
 * @throws AppError if there is an issue deleting the operation.
 */
export async function deleteOperations(userId: number, operationId: number): Promise<Operation> {
    try {
        const operations = await OperationsRepository.deleteOperations(userId, operationId);
        return OperationsSchema.parse(operations);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse operation (operation deleted successfully)", 500) : error;
    }
}
