import { Express, Request, Response } from 'express';

/**
 * Permet d'initialiser les routes de l'application
 * @param app Application Express
 * @returns void
 */
export function initRoutes(app: Express): void {
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World!')
    });
}
