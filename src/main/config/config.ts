import dotenv from 'dotenv';
import { normalizePort } from '../utils/utils';

dotenv.config();

interface Config {
    readonly base_url: string;
    readonly app_port: number;
    readonly host_name: string;
    readonly app_env: string;
    readonly app_name: string;
    readonly app_local: string;
    readonly admin_email?: string;
    readonly db_uri: string;

    readonly handshake_static_token?: string;
    private_token?: string; // FlorAccess private token
    private_timestamp?: number; // FlorAccess private timestamp
    readonly auth_app_handshake_url: string;
    auth_app_url?: string;

    readonly hash_algorithm?: string; // Hash algorithm for security, default is sha256
}

const DEFAULT_PORT: number = 8080;
const config: Config = {
    base_url: process.env.BASE_URL || ("http://localhost:" + (normalizePort(process.env.APP_PORT || String(DEFAULT_PORT)) || DEFAULT_PORT)),
    app_port: normalizePort(process.env.APP_PORT || String(DEFAULT_PORT)) || DEFAULT_PORT,
    host_name: process.env.HOST_NAME || 'localhost',
    app_env: process.env.APP_ENV || 'default',
    app_name: process.env.APP_NAME || 'Éconoris',
    app_local: process.env.APP_LOCAL || 'en_US',
    admin_email: process.env.ADMIN_EMAIL || '',
    db_uri: process.env.DB_URI || '',
    handshake_static_token: process.env.HANDSHAKE_STATIC_TOKEN || '',
    auth_app_handshake_url: process.env.AUTH_APP_HANDSHAKE_URL || '',

    hash_algorithm: process.env.HASH_ALGORITHM || 'sha256',
};


export default config;
