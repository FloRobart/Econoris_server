import http from 'http';
import app from './app';
import config from './config/AppConfig';
import { Database } from './core/models/Database.model';
import AppConfig from './config/AppConfig';
import * as logger from './core/utils/logger';
import cron from 'node-cron';
import { generateSubscriptionOperationsJob } from './core/cron/generate_subscription_operations.job';



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
    cron.schedule('0 3 * * *', async () => {
        try {
            logger.info("Starting subscription operations generation job");
            await generateSubscriptionOperationsJob();
            logger.success("Subscription operations generation job completed");
        } catch (error) {
            logger.error(error);
        }
    });


    /*==================*/
    /* Écoute du server */
    /*==================*/
    const server = http.createServer(app);

    server.listen(config.app_port, config.host_name, () => {
        logger.success("Server running at PORT :", config.app_port, "!");
        logger.success("Server running at URL :", config.base_url, "!");
        logger.success("Server documentation running at URL :", config.base_url + "/api-docs", "!");
    });

    server.on("error", (error: Error) => {
        logger.error("FAILED STARTING SERVER\n");
        logger.error(error);
        process.exit(1);
    });
})();