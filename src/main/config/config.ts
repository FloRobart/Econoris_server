import dotenv from 'dotenv';
import { normalizePort } from '../utils/utils';

dotenv.config();

interface Config {
    app_env: string;
    app_port: number;
    app_url: string;
    app_name: string;
    app_local: string;
    admin_email?: string;
    db_uri: string;
}

const DEFAULT_PORT: number = 8080;
const config: Config = {
    app_env: process.env.APP_ENV || 'default',
    app_port: normalizePort(process.env.APP_PORT || String(DEFAULT_PORT)) || DEFAULT_PORT,
    app_url: process.env.APP_URL || "http://localhost",
    app_name: process.env.APP_NAME || 'Éconoris',
    app_local: process.env.APP_LOCAL || 'en_US',
    admin_email: process.env.ADMIN_EMAIL || '',
    db_uri: process.env.DB_URI || '',
};


export default config;
