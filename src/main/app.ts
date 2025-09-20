import express from 'express';
import operationRoutes from './routes/operationRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { connectToDatabase } from './database/database';
import * as logger from './utils/logger';
import fs from 'node:fs';
import config from './config/config';
import { authHandler } from './middlewares/authHandler';
import handshakeRoutes from './routes/handshakeRoutes';
import cors from 'cors';
import { ENABLE_ENV } from './config/enableenv';
import { defaultRouteHandler } from './middlewares/defaultRouteHandler';



const app = express();



/* Configuration */
app.locals.title = config.app_name;
app.locals.strftime = require('strftime').localizeByIdentifier(config.app_local);
app.locals.lang = config.app_local;
app.locals.email = config.admin_email;



/* Database */
connectToDatabase(config.db_uri);



/* Routes */
app.use(express.json());

app.get('/', (_req, res) => { res.status(200).send('HEALTH CHECK') });

app.use("/handshake", handshakeRoutes);

app.use(cors(config.corsOptions), authHandler);

app.use('/operations', cors(config.corsOptions), operationRoutes);

app.use(defaultRouteHandler);
app.use(errorHandler);



/* Swagger - only in development */
if (ENABLE_ENV[config.app_env] === 5) {
    /* Swagger setup */
    const SWAGGER_JSON_PATH = `${__dirname}/swagger/swagger.json`;
    const swaggerUi = require('swagger-ui-express');
    const swaggerJsDoc = require('swagger-jsdoc');
    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: `${config.app_name} API`,
                version: '2.0.0',
                description: 'API documentation',
            },
            servers: [
                {
                    url: config.base_url,
                },
            ],
        },
        apis: [`${__dirname}/routes/*.ts`, `${__dirname}/swagger/*.ts`, `${__dirname}/routes/*.js`, `${__dirname}/swagger/*.js`], // files containing annotations as above
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.get('/api-docs.json', (req, res) => {
        if (!app.locals.swaggerJsonFileCreated) {
            res.status(500).json({ error: "The Swagger JSON file encountered a problem creating it. Please see : " + config.base_url + "/api-docs" });
            return;
        }
        return res.download(SWAGGER_JSON_PATH)
    })

    /* Create swagger json file */
    try {
        fs.writeFileSync(SWAGGER_JSON_PATH, Buffer.from(JSON.stringify(swaggerDocs), 'utf8'));
        app.locals.swaggerJsonFileCreated = true;
        logger.success("Swagger JSON file created at :", SWAGGER_JSON_PATH);
    } catch (err) {
        logger.error(err);
        app.locals.swaggerJsonFileCreated = false;
        logger.error("Error creating swagger JSON file at :", SWAGGER_JSON_PATH);
    }
}



export default app;