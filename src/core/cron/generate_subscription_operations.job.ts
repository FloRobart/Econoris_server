import { selectSubscriptionsActive } from '../../modules/subscriptions/subscriptions.service';
import { generateMissingOperations } from '../../modules/operations/operations.service';
import { AppError } from '../models/AppError.model';



/**
 * Generate missing operations for all active subscriptions.
 * @throws AppError if there is an issue during the job execution.
 */
export async function generateSubscriptionOperationsJob(): Promise<void> {
    try {
        const subscriptions = await selectSubscriptionsActive();
        for (const subscription of subscriptions) {
            await generateMissingOperations(subscription);
        }
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to generate subscription operations", 500);
    }
}
