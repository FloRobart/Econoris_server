import { Request, Response, NextFunction } from 'express';
import * as logger from '../utils/logger';
import config from '../config/config';
import http from 'node:http';
import { AppError } from '../models/ErrorModel';



/**
 * Verify if jwt is present and valid in the headers request
 * @param req Request
 * @param res Response
 * @param next Next function
 * @returns void
 */
export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Incoming request`, { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, method: req.method, url: req.url });

    if (req.url === '/api-docs' || req.url === '/api-docs.json') { next(); return; }

    if (!req.headers['authorization']) {
        logger.warning('Unauthorized access attempt', { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, method: req.method, url: req.url });
        next(new AppError('Unauthorized', 401));
        return;
    }

    const authorization = req.headers['authorization'];
    if (!authorization || authorization.split(' ').length !== 2) {
        logger.warning('Unauthorized access attempt', { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, method: req.method, url: req.url });
        next(new AppError('Unauthorized', 401));
        return;
    }

    const [schema, token] = authorization.split(' ');
    if (!token || schema !== "Bearer") {
        logger.warning('Unauthorized access attempt', { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, method: req.method, url: req.url });
        next(new AppError('Unauthorized', 401));
        return;
    }

    verifToken(req, next, token, 2);
};


/**
 * Verify token with auth app
 * @param req Request
 * @param next NextFunction
 * @param token Token to verify
 * @param maxRetry Maximum number of retries if auth app responds with error
 */
function verifToken(req: Request, next: NextFunction, token: string, maxRetry: number) {
    http.get(`${config.auth_app_url}/jwt/user?jwt=${token}`, {
        headers: {
            'Authorization': `${config.app_name} ${config.private_token}`
        }
    }, (response: http.IncomingMessage) => {
        response.on('data', (chunk) => {
            try {
                if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
                    const user = JSON.parse(chunk.toString());
                    req.body.user = user;
                    next();
                } else {
                    if (maxRetry > 1) {
                        setTimeout(() => {
                            verifToken(req, next, token, maxRetry - 1);
                        }, 3000);
                        return;
                    } else {
                        next(new AppError('Unauthorized', 401));
                        return;
                    }
                }
            } catch (err) {
                next(new AppError('Unauthorized', 401));
                return;
            }
        });
    }).on('error', (err) => {
        next(new AppError('Unauthorized', 401));
    });
}