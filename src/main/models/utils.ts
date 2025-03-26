/**
 * Gets a valid port number
 * @param val Port number
 * @returns Valid port number or null if the port number is not a number
 */
export function normalizePort(val: string): number | null {
    var port = parseInt(val.replace(" ", ""), 10);
    if (isNaN(port)) { return null; }
    return Math.max(0, Math.min(port, 65535));
}
