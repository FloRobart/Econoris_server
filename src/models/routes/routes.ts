import { Express, Request, Response } from 'express';


/**
 * Permet d'initialiser les routes de l'application
 * @param app Application Express
 * @returns void
 */
export function initRoutes(app: Express): void {
    /**
     * Accueil
     * @route GET /
     * @group Accueil
     * @returns {void} 200 - Page d'accueil
     */
    app.get('/', (req: Request, res: Response) => {
        res.render('index', {
            title: app.locals.title,
            lang: app.locals.lang,
            email: app.locals.email
        });
    });

    
}
