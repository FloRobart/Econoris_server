import { Request, Response, NextFunction } from 'express';
import * as logger from '../utils/logger';


/**
 * Verify if jwt is present and valid in the headers request
 * @param req Request
 * @param res Response
 * @param next Next function
 * @returns void
 */
export const authHandler = (req: Request, res: Response, next: NextFunction) => {
    if (req.url === '/api-docs' || req.url === '/api-docs.json') { return next(); }

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

    const schema = authorization.split(' ')[0];
    const token = authorization.split(' ')[1];
    if (!token || schema !== "Bearer") {
        logger.error('Unauthorized access attempt', { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, method: req.method, url: req.url });
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    // Here you would typically verify the token
    // For example, using a JWT library to decode and verify the token
    // jwt.verify(token, secretKey, (err, decoded) => {
    //     if (err) {
    //         return res.status(401).json({ error: 'Unauthorized' });
    //     }
    //     req.user = decoded; // Attach user info to request
    //     next();
    // });

    next(); // Mock user for demonstration
};
