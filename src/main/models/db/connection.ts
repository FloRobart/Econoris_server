import pg from 'pg';
require('dotenv').config();

const { Client } = pg;
const DB_URI = process.env.DB_URI;
let client: pg.Client;


/**
 * Connects the server to the database
 * @async
 * @returns true if connected successfully, otherwise false
 */
export async function connectToDatabase(): Promise<boolean> {
    try {
        client = new Client(DB_URI);
        client.connect();

        client.on('error', (err) => {
            console.error(err);
            console.error("\n [❌] DATABASE ERROR")
        })

        console.log(" [✅] Database connected !");
        return true;
    } catch (err) {
        console.error(err);
        console.error("\n [❌] FAILED CONNECTING TO DATABASE");
        return false;
    }
}
