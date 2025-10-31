import { AppError } from '../models/AppError.model';
import { selectAllSubscriptionsEnded, updateBulkSubscriptionsActive } from '../../modules/subscriptions/subscriptions.service';
import { SubscriptionsUpdateSchema } from '../../modules/subscriptions/subscriptions.schema';



/**
 * Generate missing operations for all active subscriptions.
 * @throws AppError if there is an issue during the job execution.
 */
export async function disableEndedSubscriptionsJob(): Promise<void> {
    try {
        const endedSubscriptions = await selectAllSubscriptionsEnded();
        const endedSubscriptionsToUpdate = SubscriptionsUpdateSchema.array().parse(endedSubscriptions);

        if (endedSubscriptionsToUpdate.length <= 0) {
            return;
        }

        await updateBulkSubscriptionsActive(endedSubscriptionsToUpdate, false);
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to generate subscription operations", 500);
    }
}
