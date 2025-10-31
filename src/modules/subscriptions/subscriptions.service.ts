import { Subscription, SubscriptionInsert, SubscriptionUpdate } from './subscriptions.types';
import * as SubscriptionsRepository from './subscriptions.repository';
import { SubscriptionsSchema } from './subscriptions.schema';
import { ZodError } from 'zod';
import { AppError } from '../../core/models/AppError.model';
import { insertMissingOperations } from '../operations/operations.service';



/*========*/
/* SELECT */
/*========*/
/**
 * Get all subscriptions for a user.
 * @param userId The ID of the user.
 * @returns An array of Subscription objects.
 * @throws AppError if there is an issue retrieving the subscriptions.
 */
export async function selectSubscriptions(userId: number): Promise<Subscription[]> {
    try {
        const subscriptions = await SubscriptionsRepository.selectSubscriptions(userId);
        return SubscriptionsSchema.array().parse(subscriptions);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse subscriptions", 500) : error;
    }
}

/**
 * Get all active and started and not yet ended subscriptions.
 * @returns Subscription[] An array of active Subscription objects.
 * @throws AppError if there is an issue retrieving the active subscriptions.
 */
export async function selectAllSubscriptionsActive(): Promise<Subscription[]> {
    try {
        const subscriptions = await SubscriptionsRepository.selectAllSubscriptionsActive();
        return SubscriptionsSchema.array().parse(subscriptions);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse active subscriptions", 500) : error;
    }
}


/*========*/
/* INSERT */
/*========*/
/**
 * Insert a new subscription for a user.
 * @param subscriptionData The subscription data to insert.
 * @returns The newly created Subscription object.
 * @throws AppError if there is an issue inserting the subscription.
 */
export async function insertSubscriptions(subscriptionData: SubscriptionInsert): Promise<Subscription> {
    try {
        const subscriptions = await SubscriptionsRepository.insertSubscriptions(subscriptionData);
        const validatedSubscriptions = SubscriptionsSchema.parse(subscriptions);
        await insertMissingOperations(validatedSubscriptions);

        return validatedSubscriptions;
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse subscription (subscription inserted successfully)", 500) : error;
    }
}


/*========*/
/* UPDATE */
/*========*/
/**
 * Update an existing subscription for a user.
 * @param subscriptionData The subscription data to update.
 * @returns The updated Subscription object.
 */
export async function updateSubscriptions(subscriptionData: SubscriptionUpdate): Promise<Subscription> {
    try {
        const subscriptions = await SubscriptionsRepository.updateSubscriptions(subscriptionData);
        return SubscriptionsSchema.parse(subscriptions);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse subscription (subscription updated successfully)", 500) : error;
    }
}

/**
 * Update the last_generated_at field of a subscription.
 * @param subscriptionId ID of the subscription to update.
 * @param lastGeneratedAt The new last_generated_at value.
 * @throws AppError if there is an issue updating the field.
 */
export async function updateSubscriptionsLastGeneratedAt(subscriptionId: number, lastGeneratedAt: Date): Promise<void> {
    try {
        await SubscriptionsRepository.updateSubscriptionsLastGeneratedAt(subscriptionId, lastGeneratedAt);
    } catch (error) {
        throw (error instanceof AppError) ? error : new AppError("Failed to update last_generated_at", 500);
    }
}


/*========*/
/* DELETE */
/*========*/
/**
 * Delete an subscription for a user.
 * @param userId The ID of the user.
 * @param subscriptionId The ID of the subscription to delete.
 * @returns The deleted Subscription object.
 * @throws AppError if there is an issue deleting the subscription.
 */
export async function deleteSubscriptions(userId: number, subscriptionId: number): Promise<Subscription> {
    try {
        const subscriptions = await SubscriptionsRepository.deleteSubscriptions(userId, subscriptionId);
        return SubscriptionsSchema.parse(subscriptions);
    } catch (error) {
        throw (error instanceof ZodError) ? new AppError("Failed to parse subscription (subscription deleted successfully)", 500) : error;
    }
}
