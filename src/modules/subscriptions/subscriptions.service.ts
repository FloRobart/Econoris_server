import { Subscription, SubscriptionInsert, SubscriptionUpdate } from './subscriptions.types';
import * as SubscriptionsRepository from './subscriptions.repository';
import { SubscriptionsSchema } from './subscriptions.schema';
import { ZodError } from 'zod';
import { AppError } from '../../core/models/AppError.model';



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
        throw error;
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
        return SubscriptionsSchema.parse(subscriptions);
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
