import http from 'http';
import app from './app';
import config from './config/AppConfig';
import { Database } from './core/models/Database.model';
import AppConfig from './config/AppConfig';
import * as logger from './core/utils/logger';



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


    /*==================*/
    /* Écoute du server */
    /*==================*/
    const server = http.createServer(app);

    try {
        server.listen(config.app_port, config.host_name,() => {
            logger.success("Server running at PORT :", config.app_port, "!");
            logger.success("Server running at URL :", config.base_url, "!");
            logger.success("Server documentation running at URL :", config.base_url + "/api-docs", "!");
        }).on("error", (error) => {
            logger.error("FAILED STARTING SERVER\n");
            throw new Error(error.message);
        });
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
})();