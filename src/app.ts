import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './core/middlewares/error.middleware';
import * as logger from './core/utils/logger';
import fs from 'node:fs';
import AppConfig from './config/AppConfig';
import { limiter } from './core/middlewares/rate_limiter.middleware';
import cors from 'cors';
import { defaultRouteHandler } from './core/middlewares/default_route.middleware';
import path from 'node:path';
import helmet from 'helmet';
import { helmetOptions } from './core/middlewares/helmet_http_headers.middleware';
import operationsRoutes from './modules/operations/operations.routes';
import { authorizationValidator } from './core/middlewares/validators/auth_validator.middleware';
import loansRoutes from './modules/loans/loans.routes';
import subscriptionsRoutes from './modules/subscriptions/subscriptions.routes';
import morgan from 'morgan';



const app = express();



/* Cross Origin Resource Sharing (CORS) */
app.use(cors(AppConfig.corsOptions));

/* Security headers (Helmet) */
app.use(helmet(helmetOptions));

/* Trust proxy in production */
if (AppConfig.app_env.includes('prod')) {
    app.set('trust proxy', true);
}

/* Logger */
app.use(async (req: Request, _res: Response, next: NextFunction) => {
    logger.info(`Incoming request`, { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, method: req.method, url: req.url });
    next();
});

/* Rate Limiter */
app.use(limiter);

/* Body parser */
app.use(express.json());

/* Health Check */
app.get('/', (_req, res) => { res.status(200).send('HEALTH CHECK') });

/* Favicon */
app.get("/favicon.ico", (_req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "icons", "favicon.ico"));
});


/* Swagger setup for API documentation in development environment */
if (AppConfig.app_env.includes('dev')) {
    const swaggerUi = require('swagger-ui-express');
    const swaggerJsDoc = require('swagger-jsdoc');
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: `Genesis-app`,
                version: packageJson.version,
                description: 'Genesis-app documentation',
            },
        },
        apis: [`${__dirname}/modules/**/*.ts`, `${__dirname}/modules/**/*.js`],
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', morgan(config.log));
    app.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.get('/api-docs.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocs);
    });
}


/* Authentication Middleware */
app.use(authorizationValidator);

/* Logger */
morgan.token("remote-user", (req: Request) => { return req.body.user.email || "Unknown User" });
app.use(morgan(AppConfig.log_format));

/* Operations routes */
app.use('/operations', operationsRoutes);

/* subscriptions routes */
app.use('/subscriptions', subscriptionsRoutes);

/* work hours routes */
// app.use('/work-hours', work_hoursRoutes);

/* loans routes */
app.use('/loans', loansRoutes);


/* Default Route Handler (404) */
app.use(defaultRouteHandler);

/* Error Handler */
app.use(errorHandler);



export default app;
