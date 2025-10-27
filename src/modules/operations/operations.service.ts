import { Operation } from './operations.types';
import * as OperationsRepository from './operations.repository';
import { OperationsSchema } from './operations.schema';


/*========*/
/* SELECT */
/*========*/
export async function selectOperations(userId: string): Promise<Operation[]> {
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
export async function insertOperations(userId: string, operationData: Operation): Promise<Operation> {
    try {
        const operations = await OperationsRepository.insertOperations(userId, operationData);
        return OperationsSchema.parse(operations);
    } catch (error) {
        throw error;
    }
}


/*========*/
/* UPDATE */
/*========*/
export async function updateOperations(userId: string, operationData: Operation): Promise<Operation> {
    try {
        const operations = await OperationsRepository.updateOperations(userId, operationData);
        return OperationsSchema.parse(operations);
    } catch (error) {
        throw error;
    }
}


/*========*/
/* DELETE */
/*========*/
export async function deleteOperations(userId: string, operationId: string): Promise<Operation> {
    try {
        const operations = await OperationsRepository.deleteOperations(userId, operationId);
        return OperationsSchema.parse(operations);
    } catch (error) {
        throw error;
    }
}
