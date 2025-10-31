import http from 'http';
import app from './app';
import { Database } from './core/models/Database.model';
import AppConfig from './config/AppConfig';
import * as logger from './core/utils/logger';
import cron from 'node-cron';
import { generateSubscriptionOperationsJob } from './core/cron/generate_subscription_operations.job';
import { validateOperationsJob } from './core/cron/validate_operations.job';
import { disableEndedSubscriptionsJob } from './core/cron/disabled_ended_subscriptions.job';



(async () => {
    /*========================*/
    /* Connection to Database */
    /*========================*/
    try {
        const database = new Database(AppConfig.db_uri);
        await database.connect();
        logger.success("Connected to database successfully");
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }


    /*=================*/
    /* Cron Jobs Setup */
    /*=================*/
    if (AppConfig.app_env.includes('prod')) {
        cron.schedule('0 3 * * *', async () => {
            try {
                logger.info("Starting subscription operations generation job");
                await generateSubscriptionOperationsJob();
                logger.success("Subscription operations generation job completed");

                logger.info("Starting operations validation job");
                await validateOperationsJob();
                logger.success("Operations validation job completed");

                logger.info("Starting disable ended subscriptions job");
                await disableEndedSubscriptionsJob();
                logger.success("Disable ended subscriptions job completed");
            } catch (error) {
                logger.error(error);
            }
        });
    }


    /*==================*/
    /* Écoute du server */
    /*==================*/
    const server = http.createServer(app);

    server.listen(AppConfig.app_port, AppConfig.host_name, () => {
        logger.success("Server running at PORT :", AppConfig.app_port, "!");
        logger.success("Server running at URL :", AppConfig.base_url, "!");
        logger.success("Server documentation running at URL :", AppConfig.base_url + "/api-docs", "!");
    });

    server.on("error", (error: Error) => {
        logger.error("FAILED STARTING SERVER\n");
        logger.error(error);
        process.exit(1);
    });
})();