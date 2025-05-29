require('dotenv').config();

const ENABLE_ENV: Record<string, number> = {
    "development": 4,
    "dev": 4,
    "debug": 4,
    "local": 4,
    "local-dev": 4,
    "verbose": 4,

    "production": 3,
    "prod": 3,
    "info": 3,

    "success": 2,

    "error": 1,
    "error-only": 1,

    "none": 0,
    "silent": 0,
    "off": 0,
    "disable": 0,
    "default": 0,
};

const APP_ENV: number = ENABLE_ENV[process.env.APP_ENV || "none"] || 0;
const APP_NAME: string = process.env.APP_NAME || "Éconoris";



/**
 * Logger function to log messages based on the environment level.
 * @description
 * - If APP_ENV is 0, no logs will be displayed.
 * - If APP_ENV is 1, only error logs will be displayed.
 * - If APP_ENV is 2, success and error logs will be displayed.
 * - If APP_ENV is 3, info, success, and error logs will be displayed.
 * - If APP_ENV is 4, debug, info, success, and error logs will be displayed.
 * @param message
 * @param args 
 */
export function error(...args: any[]) {
    if (APP_ENV >= 1) {
        console.log(` [❌] ${APP_NAME} - ERROR |`, ...args);
    }
}

/**
 * Logger function to log messages based on the environment level.
 * @description
 * - If APP_ENV is 0, no logs will be displayed.
 * - If APP_ENV is 1, only error logs will be displayed.
 * - If APP_ENV is 2, success and error logs will be displayed.
 * - If APP_ENV is 3, info, success, and error logs will be displayed.
 * - If APP_ENV is 4, debug, info, success, and error logs will be displayed.
 * @param message 
 * @param args 
 */
export function success(...args: any[]) {
    if (APP_ENV >= 2) {
        console.log(` [✅] ${APP_NAME} - SUCCESS |`, ...args);
    }
}

/**
 * Logger function to log messages based on the environment level.
 * @description
 * - If APP_ENV is 0, no logs will be displayed.
 * - If APP_ENV is 1, only error logs will be displayed.
 * - If APP_ENV is 2, success and error logs will be displayed.
 * - If APP_ENV is 3, info, success, and error logs will be displayed.
 * - If APP_ENV is 4, debug, info, success, and error logs will be displayed.
 * @param message 
 * @param args 
 */
export function info(...args: any[]) {
    if (APP_ENV >= 3) {
        console.log(` [❕] ${APP_NAME} - INFO |`, ...args);
    }
}

/**
 * Logger function to log messages based on the environment level.
 * @description
 * - If APP_ENV is 0, no logs will be displayed.
 * - If APP_ENV is 1, only error logs will be displayed.
 * - If APP_ENV is 2, success and error logs will be displayed.
 * - If APP_ENV is 3, info, success, and error logs will be displayed.
 * - If APP_ENV is 4, debug, info, success, and error logs will be displayed.
 * @param message 
 * @param args 
 */
export function debug(...args: any[]) {
    if (APP_ENV >= 4) {
        console.log(` [🐛] ${APP_NAME} - DEBUG |`, ...args);
    }
}
