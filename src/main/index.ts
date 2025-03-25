/* Import */
import express from 'express';
import { initRoutes } from './models/routes/routes';
import path from 'path';
require('dotenv').config();

/* Constantes */
const APP_PORT: string = process.env.APP_PORT || "80";
const APP_URL: string = process.env.APP_URL || "http://localhost";
const APP_NAME: string = process.env.APP_NAME || "Title";
const APP_LOCAL: string = process.env.APP_LOCAL || "en_US";
const ADMIN_EMAIL: string = process.env.ADMIN_EMAIL || "";



/*=============*/
/* Application */
/*=============*/
const server = require('http').createServer();
const app = express();

/* Configuration */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.locals.title = APP_NAME;
app.locals.strftime = require('strftime').localizeByIdentifier(APP_LOCAL);
app.locals.lang = APP_LOCAL;
app.locals.email = ADMIN_EMAIL;


/* Initialisation des routes */
initRoutes(app);


/* Écoute du server */
server.listen(APP_PORT, () => {
    console.log("Serveur disponible sur l'url :", APP_URL + ":" + APP_PORT);
})
