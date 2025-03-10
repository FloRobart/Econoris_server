/* Import */
import express from 'express';
import { initRoutes } from './models/routes/routes';
require('dotenv').config();

/* Constantes */
const PORT: string = process.env.PORT || "80";
const URL: string = process.env.APP_URL || "http://localhost";

/*=============*/
/* Application */
/*=============*/
const app = express();

/* Configuration */
app.set('view engine', 'ejs');
app.locals.title = process.env.APP_NAME || "Title";
app.locals.strftime = require('strftime').localizeByIdentifier(process.env.APP_LOCAL || "en_US");
app.locals.email = process.env.ADMIN_EMAIL;


/* Initialisation des routes */
initRoutes(app);


/* Écoute du server */
app.listen(PORT, () => {
  console.log("Serveur disponible sur l'url :", URL + ":" + PORT);
})
