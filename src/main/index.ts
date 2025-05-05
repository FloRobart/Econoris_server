/* Import */
import express from 'express';
import path from 'path';
import http from 'http';
import { initRoutes } from './routes/routes';
import { normalizePort } from './models/utils';
import { connectToDatabase } from './models/database';
import { clone } from './controllers/Controller';
import fs from 'node:fs';
require('dotenv').config();

/* Constantes */
const DEFAULT_PORT: number = 8080;
const APP_PORT: number = normalizePort(process.env.APP_PORT || String(DEFAULT_PORT)) || DEFAULT_PORT;
const APP_URL: string = process.env.APP_URL || "http://localhost";
const APP_NAME: string = process.env.APP_NAME || "Éconoris";
const APP_LOCAL: string = process.env.APP_LOCAL || "en_US";
const ADMIN_EMAIL: string = process.env.ADMIN_EMAIL || "";
const DB_URI = process.env.DB_URI;
const SWAGGER_JSON_PATH = `${__dirname}/swagger/swagger.json`;

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


/*=============*/
/* Application */
/*=============*/
const app = express();
const server = http.createServer(app);

/* Configuration */
app.use(express.json());
app.locals.title = APP_NAME;
app.locals.strftime = require('strftime').localizeByIdentifier(APP_LOCAL);
app.locals.lang = APP_LOCAL;
app.locals.email = ADMIN_EMAIL;

/* Swagger setup */
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Éconoris API',
            version: '2.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: APP_URL + ":" + APP_PORT,
            },
        ],
    },
    apis: [`${__dirname}/routes/*.ts`, `${__dirname}/swagger/swagger.ts`], // files containing annotations as above
};
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/api-docs.json', (req, res) => {
    if (!app.locals.swaggerJsonFileCreated) {
        res.status(500).json({ error: "The Swagger JSON file encountered a problem creating it. Please see : " + APP_URL + ":" + APP_PORT + "/api-docs" });
        return;
    }
    return res.download(SWAGGER_JSON_PATH)
})

/* Connexion à la base de données */
connectToDatabase(DB_URI);

/* Initialisation des routes */
initRoutes(app);

/* Create swagger json file */
try {
    fs.writeFileSync(SWAGGER_JSON_PATH, Buffer.from(JSON.stringify(swaggerDocs), 'utf8'));
    app.locals.swaggerJsonFileCreated = true;
    console.log(" [✅] Swagger JSON file created at :", SWAGGER_JSON_PATH);
} catch (err) {
    console.error(err);
    app.locals.swaggerJsonFileCreated = false;
    console.error(" [❌] Error creating swagger JSON file at :", SWAGGER_JSON_PATH);
}

/* Écoute du server */
server.listen(APP_PORT, () => {
    console.log(" [✅] Server running at PORT :", APP_PORT, "!");
    console.log(" [✅] Server running at URL :", APP_URL, "!");
    console.log(" [✅] Server documentation at URL :", APP_URL + ":" + APP_PORT + "/api-docs", "!");
}).on("error", (error) => {
    console.error(" [❌] FAILED STARTING SERVER\n");
    throw new Error(error.message);
});
