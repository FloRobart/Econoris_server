import { z } from "zod";
import { SubscriptionsSchema, SubscriptionsInsertSchema, SubscriptionsUpdateSchema, SubscriptionsIdUpdateSchema, SubscriptionsIdDeleteSchema } from "./subscriptions.schema";


/* SELECT */
export type Subscription = z.infer<typeof SubscriptionsSchema>;

/* INSERT */
export type SubscriptionInsert = z.infer<typeof SubscriptionsInsertSchema>;

/* UPDATE */
export type SubscriptionsIdUpdate = z.infer<typeof SubscriptionsIdUpdateSchema>;
export type SubscriptionUpdate = z.infer<typeof SubscriptionsUpdateSchema>;

/* DELETE */
export type SubscriptionsIdDelete = z.infer<typeof SubscriptionsIdDeleteSchema>;
