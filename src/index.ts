/* Import */
import express from 'express';
import { initRoutes } from './models/routes/routes';
require('dotenv').config();

/* Constantes */
const PORT = process.env.PORT || 8080;



/*=============*/
/* Application */
/*=============*/
const app = express();

/* Initialisation des routes */
initRoutes(app);


/* Écoute du server */
app.listen(PORT, () => {
  console.log("Serveur disponible sur l'url :", process.env.APP_URL + ":" + PORT);
})