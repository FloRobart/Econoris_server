import { Express } from 'express';


export function initRoutes(app: Express) {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    });
}