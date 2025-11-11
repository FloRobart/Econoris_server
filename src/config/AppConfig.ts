import dotenv from 'dotenv';
import ms, { type StringValue } from 'ms';


dotenv.config();



interface AppConfigInterface {
    /* Application configuration */
    readonly app_name: string;
    readonly app_port: number;
    readonly host_name: string;
    readonly base_url: string;
    readonly app_env: string;

    /* Database */
    readonly db_uri: string;

    /* Email */
    readonly mail_service: string;
    readonly mail_username: string;
    readonly mail_password: string;

    /* Rate Limiting */
    readonly request_limit_per_second: number;
    readonly request_limit_time: number;

    /* Authentication */
    readonly auth_app_url: string;

    /* CORS */
    readonly corsOptions: {
        origin: string[];
        methods: string[];
        credentials: boolean;
        allowedHeaders: string[];
    };
}


const config: AppConfigInterface = {
    /* Application configuration */
    app_name: "Econoris",
    app_port: 80,
    host_name: process.env.HOST_NAME || 'localhost',
    base_url: process.env.BASE_URL || 'http://localhost:80',
    app_env: process.env.APP_ENV?.toLowerCase() || 'dev',

    /* Database */
    db_uri: `${process.env.DB_SCHEME}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,

    /* Email */
    mail_service: process.env.MAIL_SERVICE || 'gmail',
    mail_username: process.env.MAIL_USERNAME || '',
    mail_password: process.env.MAIL_PASSWORD || '',

    /* Rate Limiting */
    request_limit_per_second: Math.round(Number(process.env.REQUEST_LIMIT_PER_SECOND)) || 10,
    request_limit_time: (ms((process.env.REQUEST_LIMIT_TIME as StringValue) || "30min") || (30 * 60 * 1000)),

    /* Authentication */
    auth_app_url: process.env.AUTH_APP_URL || 'http://localhost:26001',

    /* CORS */
    corsOptions: {
        origin: (process.env.CORS_ALLOWED_ORIGINS || '').split(',').map(origin => origin.trim()),
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
};


export default config;
