import { Operation, OperationInsert, OperationUpdate } from './operations.types';
import * as OperationsRepository from './operations.repository';
import { updateSubscriptionsLastGeneratedAt } from '../subscriptions/subscriptions.repository';
import { OperationsInsertSchema, OperationsSchema } from './operations.schema';
import { ZodError } from 'zod';
import { AppError } from '../../core/models/AppError.model';
import { addDays, addWeeks, addMonths, isAfter, endOfMonth } from 'date-fns';
import { Subscription } from '../subscriptions/subscriptions.types';
import { SubscriptionsSchema } from '../subscriptions/subscriptions.schema';



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
        throw (error instanceof ZodError) ? new AppError("Failed to parse operations", 500) : error;
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

/**
 * Insert multiple operations for a user in bulk.
 * @param operations The array of operation data to insert.
 * @throws AppError if there is an issue inserting the operations.
 */
export async function insertBulkOperations(operationsData: OperationInsert[]): Promise<void> {
    if (operationsData.length === 0) return;

    try {
        const operations: OperationInsert[] = OperationsInsertSchema.array().parse(operationsData);

        const chunkSize = 500;
        if (operations.length > chunkSize) {
            const chunks: OperationInsert[][] = [];
            for (let i = 0; i < operations.length; i += chunkSize) {
                chunks.push(operations.slice(i, i + chunkSize));
            }
            await Promise.all(chunks.map((chunk: OperationInsert[]) => OperationsRepository.insertBulkOperations(chunk)));
            return;
        }

        await OperationsRepository.insertBulkOperations(operations);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse operations bulk", 500) : error;
    }
}

/**
 * Generate missing operations for a subscription up to the current date.
 * @param subscription The subscription object.
 * @throws AppError if there is an issue generating the operations.
 */
export async function generateMissingOperations(subscription: Subscription): Promise<void> {
    try {
        subscription = SubscriptionsSchema.parse(subscription);
    } catch (error) {
        throw new AppError("Failed to parse subscription", 500);
    }

    try {
        const operationsToInsert: OperationInsert[] = [];

        let currentDate: Date = subscription.last_generated_at ?? subscription.start_date;
        const now: Date = new Date();

        const endOfCurrentMonth: Date = endOfMonth(now);

        while (true) {
            let nextDate = getNextDate(currentDate, subscription.interval_unit, subscription.interval_value);

            if (subscription.interval_unit === 'months' && subscription.day_of_month) {
                nextDate.setDate(subscription.day_of_month);
            }

            if (subscription.end_date && isAfter(nextDate, subscription.end_date)) break;
            if (isAfter(nextDate, endOfCurrentMonth)) break;

            let validated = nextDate <= now;
            operationsToInsert.push({
                levy_date: nextDate,
                label: subscription.label,
                amount: subscription.amount,
                category: subscription.category,
                source: subscription.source,
                destination: subscription.destination,
                costs: subscription.costs,
                validated,
                subscription_id: subscription.id,
                user_id: subscription.user_id,
            });

            currentDate = nextDate;
        }

        if (operationsToInsert.length > 0) {
            await insertBulkOperations(operationsToInsert);
            await updateSubscriptionsLastGeneratedAt(subscription.id, currentDate);
        }
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to generate missing operations", 500);
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




/**
 * Get the next date based on the current date, interval unit, and value.
 * @param current Current date
 * @param unit Interval unit ('days', 'weeks', 'months')
 * @param value Interval value
 * @returns The next date
 * @throws AppError if the interval unit is unsupported
 */
function getNextDate(current: Date, unit: string, value: number): Date {
  switch (unit) {
    case 'days':
      return addDays(current, value);
    case 'weeks':
      return addWeeks(current, value);
    case 'months':
      return addMonths(current, value);
    default:
      throw new AppError(`Unsupported interval unit : ${unit}`, 400);
  }
}