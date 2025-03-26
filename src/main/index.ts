/* Import */
import express from 'express';
import path from 'path';
import http from 'http';
import { initRoutes } from './models/routes/routes';
import { normalizePort } from './models/utils';
import { connectToDatabase } from './models/db/connection';
require('dotenv').config();

/* Constantes */
const DEFAULT_PORT: number = 8080;
const APP_PORT: number = normalizePort(process.env.APP_PORT || String(DEFAULT_PORT)) || DEFAULT_PORT;
const APP_URL: string = process.env.APP_URL || "http://localhost";
const APP_NAME: string = process.env.APP_NAME || "Title";
const APP_LOCAL: string = process.env.APP_LOCAL || "en_US";
const ADMIN_EMAIL: string = process.env.ADMIN_EMAIL || "";



/*=============*/
/* Application */
/*=============*/
const app = express();
const server = http.createServer(app);

/* Configuration */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.locals.title = APP_NAME;
app.locals.strftime = require('strftime').localizeByIdentifier(APP_LOCAL);
app.locals.lang = APP_LOCAL;
app.locals.email = ADMIN_EMAIL;

/* Connexion à la base de données */
connectToDatabase();

/* Initialisation des routes */
initRoutes(app);


/* Écoute du server */
server.listen(APP_PORT, () => {
    console.log(" [✅] Server running at PORT :", APP_PORT, "!");
}).on("error", (error) => {
    console.error(" [❌] FAILED STARTING SERVER\n");
    throw new Error(error.message);
});