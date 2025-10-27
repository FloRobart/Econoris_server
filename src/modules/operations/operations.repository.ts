import { Operation } from "./operations.types";



/*========*/
/* SELECT */
/*========*/
export async function selectOperations(userId: string): Promise<Operation[]> {
    try {
        return [];
    } catch (error) {
        throw error;
    }
}


/*========*/
/* INSERT */
/*========*/
export async function insertOperations(userId: string, operationData: Operation): Promise<Operation> {
    try {
        return {} as Operation;
    } catch (error) {
        throw error;
    }
}


/*========*/
/* UPDATE */
/*========*/
export async function updateOperations(userId: string, operationData: Operation): Promise<Operation> {
    try {
        return {} as Operation;
    } catch (error) {
        throw error;
    }
}


/*========*/
/* DELETE */
/*========*/
export async function deleteOperations(userId: string, operationId: string): Promise<Operation> {
    try {
        return {} as Operation;
    } catch (error) {
        throw error;
    }
}
