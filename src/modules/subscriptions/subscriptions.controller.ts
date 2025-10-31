import { Request, Response, NextFunction } from 'express';
import * as SubscriptionsService from './subscriptions.service';
import { SubscriptionInsert, SubscriptionUpdate } from './subscriptions.types';



/*========*/
/* SELECT */
/*========*/
/**
 * Get all subscriptions for a user.
 * @param req.body.user The user object containing the user ID.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const selectSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;

        const subscriptions = await SubscriptionsService.selectSubscriptions(userId);
        res.status(subscriptions.length ? 200 : 204).json(subscriptions);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* INSERT */
/*========*/
/**
 * Insert a new subscription for a user.
 * @param req.body.user The user object containing the user ID.
 * @param req.body.validatedData.body The validated subscription data to insert.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const insertSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptionData: SubscriptionInsert = { ...req.body.validatedData.body, user_id: req.body.user.id };

        if (subscriptionData.interval_unit === "months") {
            subscriptionData.day_of_month = new Date(subscriptionData.start_date).getDate();
        } else {
            subscriptionData.day_of_month = null;
        }

        const newSubscription = await SubscriptionsService.insertSubscriptions(subscriptionData);
        res.status(201).json(newSubscription);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* UPDATE */
/*========*/
/**
 * Update an existing subscription for a user.
 * @param req.body.user The user object containing the user ID.
 * @param req.body.validatedData.body The validated subscription data to update.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const updateSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptionData: SubscriptionUpdate = { ...req.body.validatedData.body, id: req.body.validatedData.params.id, user_id: req.body.user.id };

        if (subscriptionData.interval_unit === "months") {
            subscriptionData.day_of_month = new Date(subscriptionData.start_date).getDate();
        } else {
            subscriptionData.day_of_month = null;
        }

        const subscriptions = await SubscriptionsService.updateSubscriptions(subscriptionData);
        res.status(200).json(subscriptions);
    } catch (error) {
        next(error);
    }
};


/*========*/
/* DELETE */
/*========*/
/**
 * Delete an subscription for a user.
 * @param req.body.user The user object containing the user ID.
 * @param req.body.validatedData.params.id The ID of the subscription to delete.
 * @param res The response object.
 * @param next The next middleware function.
 */
export const deleteSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body.user.id;
        const subscriptionId: number = req.body.validatedData.params.id;

        const subscriptions = await SubscriptionsService.deleteSubscriptions(userId, subscriptionId);
        res.status(200).json(subscriptions);
    } catch (error) {
        next(error);
    }
};
