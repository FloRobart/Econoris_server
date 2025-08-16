import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import * as logger from '../utils/logger';
import http from 'node:http';
import { createHash } from 'node:crypto';



/**
 * Handle the handshake process. Vérifies the handshake token and save in config the private token received.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export const handshake = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query['params'] || !req.headers['authorization']) {
            res.status(400).send();
            return;
        }

        const params: string[] = Buffer.from(req.query['params'].toString(), 'base64').toString('binary').split('.');
        const authorizationToken = req.headers['authorization'].split(' ')[1];

        if (authorizationToken !== config.handshake_static_token) {
            res.status(401).send();
            return;
        }

        if (params.length !== 3) {
            res.status(400).send();
            return;
        }

        if (params[0] !== config.app_name) {
            res.status(400).send();
            return;
        }

        res.status(200).json({ message: 'Handshake successful' });

        const newParams: string = Buffer.from(params[0] + "." + createHash(config.hash_algorithm).update(params[1]).digest('hex') + "." + parseInt(params[2], 10)).toString('base64');
        http.get(config.auth_app_handshake_url + "?params=" + newParams, {
            headers: {
                'Authorization': `Bearer ${config.handshake_static_token}`
            }
        }, (authRes: http.IncomingMessage) => {
            if (authRes.statusCode >= 200 && authRes.statusCode < 300) {
                config.private_token = params[1];
                config.private_timestamp = parseInt(params[2], 10);
                logger.success(`Handshake with Auth app successful.`);
            } else {
                logger.error(`Handshake with auth app failed with status code : ${authRes.statusCode} - ${authRes.statusMessage}`);
            }
        });
    } catch (error) {
        logger.error('Error during handshake :', error);
        next(error);
    }
}