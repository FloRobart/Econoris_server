import { Request, Response, NextFunction } from 'express';
import * as logger from '../utils/logger';
import config from '../config/config';
import http from 'node:http';


/**
 * Verify if jwt is present and valid in the headers request
 * @param req Request
 * @param res Response
 * @param next Next function
 * @returns void
 */
export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (req.url === '/api-docs' || req.url === '/api-docs.json') { next(); return; }

    if (!req.headers['authorization']) {
        logger.error('Unauthorized access attempt', { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, method: req.method, url: req.url });
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const authorization = req.headers['authorization'];
    if (!authorization || authorization.split(' ').length !== 2) {
        logger.error('Unauthorized access attempt', { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, method: req.method, url: req.url });
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const [schema, token] = authorization.split(' ');
    if (!token || schema !== "Bearer") {
        logger.error('Unauthorized access attempt', { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, method: req.method, url: req.url });
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    http.get(`${config.auth_app_url}/jwt/user?jwt=${token}`, {
        headers: {
            'Authorization': `${config.app_name} ${config.private_token}`
        }
    }, (response: http.IncomingMessage) => {
        response.on('data', (chunk) => {
            try {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    const user = JSON.parse(chunk.toString());
                    req.body.user = user;
                    next();
                } else {
                    logger.error('Unauthorized access attempt', { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, method: req.method, url: req.url });
                    res.status(401).json({ error: 'Unauthorized' });
                    return;
                }
            } catch (error) {
                logger.error('Error parsing user data', { error });
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
        });
    }).on('error', (err) => {
        logger.error('Unauthorized access attempt', { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, method: req.method, url: req.url });
        res.status(401).json({ error: 'Unauthorized' });
    });
};
