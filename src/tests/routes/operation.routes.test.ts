import { Request, Response } from 'express';
import { connectToDatabase, closeDatabaseConnection, executeQuery } from "../../main/models/database";
import { getOperations } from "../../main/routes/operation.routes";
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

describe("Operations routes test", () => {

    beforeAll(async () => {
        /* Connect database */
        await connectToDatabase({ host: DB_HOST, user: DB_USER, password: DB_PASSWORD, port: Number(DB_PORT) });

        /* Drop the test database if exist */
        await executeQuery({ text: `DROP DATABASE IF EXISTS ${DB_NAME};`, values: []});

        /* Create database */
        await executeQuery({ text: `CREATE DATABASE ${DB_NAME};`, values: []});

        /* Connect to the new database */
        await closeDatabaseConnection();
        await connectToDatabase("postgresql://" + DB_USER + ":" + DB_PASSWORD + "@" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME);
    });

    afterAll(async () => {
        /* Close database connection */
        // await closeDatabaseConnection();

        /* Connect to the default database */
        // await connectToDatabase({ host: DB_HOST, user: DB_USER, password: DB_PASSWORD, port: Number(DB_PORT) });

        /* Drop the test database */
        // await executeQuery({ text: `DROP DATABASE IF EXISTS ${DB_NAME};`, values: []});

        /* Close database connection */
        await closeDatabaseConnection();
    });

    beforeEach(async () => {
        /* Drop tables */
        await executeQuery({ text: "DROP TABLE IF EXISTS loans CASCADE;", values: []});
        await executeQuery({ text: "DROP TABLE IF EXISTS operations CASCADE;", values: []});
        await executeQuery({ text: "DROP TABLE IF EXISTS timetable CASCADE;", values: []});
        await executeQuery({ text: "DROP TABLE IF EXISTS users CASCADE;", values: []});

        /* Create tables */
        await executeQuery({
            text:  `-- Création de la table users
                    CREATE TABLE users (
                        users_id SERIAL PRIMARY KEY NOT NULL,
                        users_name VARCHAR(255) NOT NULL,
                        users_password VARCHAR(255) NOT NULL,
                        users_email VARCHAR(255) NOT NULL UNIQUE,
                        users_pp BYTEA, -- Utilisation de BYTEA pour stocker des images binaires
                        users_macadresse VARCHAR(255),
                        users_ipadresse INET,
                        users_scheduletime VARCHAR(25),
                        users_createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );

                    -- Création de la table operations
                    CREATE TABLE operations (
                        operations_id SERIAL PRIMARY KEY NOT NULL,
                        operations_date DATE DEFAULT CURRENT_DATE,
                        operations_name VARCHAR(255) NOT NULL,
                        operations_amount NUMERIC(12, 2) NOT NULL,
                        operations_source VARCHAR(255),
                        operations_dest VARCHAR(255),
                        operations_costs NUMERIC(12, 2) DEFAULT 0.0,
                        operations_categ VARCHAR(255),
                        operations_validated BOOLEAN NOT NULL,
                        operations_redundancy VARCHAR(25),
                        operations_createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        operations_userid INTEGER REFERENCES users(users_id)
                    );

                    -- Création de la table loans
                    CREATE TABLE loans (
                        loans_id SERIAL PRIMARY KEY NOT NULL,
                        loans_date DATE DEFAULT CURRENT_DATE,
                        loans_borrower VARCHAR(255) NOT NULL,
                        loans_amount NUMERIC(12, 2) NOT NULL,
                        loans_refundedamount NUMERIC(12, 2) DEFAULT 0.0,
                        loans_loanreason VARCHAR(255),
                        loans_createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        loans_userid INTEGER REFERENCES users(users_id)
                    );
                    
                    -- Création de la table timetable
                    CREATE TABLE timetable (
                        timetable_id SERIAL PRIMARY KEY NOT NULL,
                        timetable_timetabledate DATE DEFAULT CURRENT_DATE,
                        timetable_hoursnumber NUMERIC(4, 2) NOT NULL,
                        timetable_hourlyrate NUMERIC(10, 2) NOT NULL,
                        timetable_createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        timetable_userid INTEGER REFERENCES users(users_id)
                    );`
            , values: []
        });

        /* Insert values in the database */
        await executeQuery({
            text:  `-- Insertion des utilisateurs de test
                INSERT INTO users (users_name, users_password, users_email, users_pp, users_macadresse, users_ipadresse, users_scheduletime) VALUES
                    ('User 1', 'password', 'user1@gmail.com', null, null, null, null),
                    ('User 2', 'password', 'user2@gmail.com', null, null, null, null);

                -- Insertion des opérations de test
                INSERT INTO operations (operations_date, operations_name, operations_amount, operations_source, operations_dest, operations_costs, operations_categ, operations_validated, operations_redundancy, operations_userid) VALUES
                    ('2023-10-01', 'Operation 1', 100.00, 'Source A', 'Dest B', 10.00, 'Categ A', true, null, 1),
                    ('2023-10-02', 'Operation 2', 200.00, 'Source A', 'Dest A', 20.00, 'Categ B', true, null, 2),
                    ('2023-10-03', 'Operation 3', 150.00, 'Source C', 'Dest C', 15.00, 'Categ B', true, null, 1),
                    ('2023-10-04', 'Operation 4', 250.00, 'Source D', 'Dest A', 25.00, 'Categ B', false, null, 2),
                    ('2023-10-05', 'Operation 5', 300.00, 'Source E', 'Dest B', 30.00, 'Categ C', true, null, 1),
                    ('2023-10-06', 'Operation 6', 400.00, 'Source F', 'Dest C', 25.00, 'Categ C', false, null, 2);

                -- Insertion loans de test
                INSERT INTO loans (loans_date, loans_borrower, loans_amount, loans_refundedamount, loans_loanreason, loans_userid) VALUES
                    ('2023-10-01', 'User 1', 1000.00, 0.00, 'Loan for project A', 1),
                    ('2023-10-02', 'User 2', 2000.00, 500.00, 'Loan for project B', 2),
                    ('2023-10-03', 'User 1', 1500.00, 300.00, 'Loan for project C', 1),
                    ('2023-10-04', 'User 2', 2500.00, 1000.00, 'Loan for project D', 2);`
            , values: []
        });
    });

    afterEach(async () => {
        
    });




    /**
     * @test routes /get/operations/all
     */
    test("Get all operation", async () => {
        const response = await getOperations({ method: "GET", query: {}, body: {}, params: {"table": "operations"}, headers: {}, get: jest.fn() } as unknown as Request, { status: (code: number) => ({ json: (data: any) => data }) } as Response);
        const jsonResponse = JSON.parse(JSON.stringify(response));

        /* Check response */
        expect(response).toBeInstanceOf(Array);
        expect(response).toHaveLength(6);
    
        jsonResponse.forEach((operation: Object) => {
            expect(operation).toHaveProperty('operations_date');
            expect(operation).toHaveProperty('operations_createdat');
        });

        expect(response).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ operations_id: 1, operations_name: 'Operation 1', operations_amount: "100.00", operations_source: "Source A", operations_dest: "Dest B", operations_costs: "10.00", operations_categ: "Categ A", operations_validated: true , operations_redundancy: null, operations_userid: 1 }),
                expect.objectContaining({ operations_id: 2, operations_name: 'Operation 2', operations_amount: "200.00", operations_source: "Source A", operations_dest: "Dest A", operations_costs: "20.00", operations_categ: "Categ B", operations_validated: true , operations_redundancy: null, operations_userid: 2 }),
                expect.objectContaining({ operations_id: 3, operations_name: 'Operation 3', operations_amount: "150.00", operations_source: "Source C", operations_dest: "Dest C", operations_costs: "15.00", operations_categ: "Categ B", operations_validated: true , operations_redundancy: null, operations_userid: 1 }),
                expect.objectContaining({ operations_id: 4, operations_name: 'Operation 4', operations_amount: "250.00", operations_source: "Source D", operations_dest: "Dest A", operations_costs: "25.00", operations_categ: "Categ B", operations_validated: false, operations_redundancy: null, operations_userid: 2 }),
                expect.objectContaining({ operations_id: 5, operations_name: 'Operation 5', operations_amount: "300.00", operations_source: "Source E", operations_dest: "Dest B", operations_costs: "30.00", operations_categ: "Categ C", operations_validated: true , operations_redundancy: null, operations_userid: 1 }),
                expect.objectContaining({ operations_id: 6, operations_name: 'Operation 6', operations_amount: "400.00", operations_source: "Source F", operations_dest: "Dest C", operations_costs: "25.00", operations_categ: "Categ C", operations_validated: false, operations_redundancy: null, operations_userid: 2 })
            ])
        );
    });

    /**
     * @test routes /get/operations/all with query
     */
    test("Get all operation where query'", async () => {
        const operations = [
            { operations_id: 1, operations_name: 'Operation 1', operations_amount: "100.00", operations_source: "Source A", operations_dest: "Dest B", operations_costs: "10.00", operations_categ: "Categ A", operations_validated: true , operations_redundancy: null, operations_userid: 1 },
            { operations_id: 2, operations_name: 'Operation 2', operations_amount: "200.00", operations_source: "Source A", operations_dest: "Dest A", operations_costs: "20.00", operations_categ: "Categ B", operations_validated: true , operations_redundancy: null, operations_userid: 2 },
            { operations_id: 3, operations_name: 'Operation 3', operations_amount: "150.00", operations_source: "Source C", operations_dest: "Dest C", operations_costs: "15.00", operations_categ: "Categ B", operations_validated: true , operations_redundancy: null, operations_userid: 1 },
            { operations_id: 4, operations_name: 'Operation 4', operations_amount: "250.00", operations_source: "Source D", operations_dest: "Dest A", operations_costs: "25.00", operations_categ: "Categ B", operations_validated: false, operations_redundancy: null, operations_userid: 2 },
            { operations_id: 5, operations_name: 'Operation 5', operations_amount: "300.00", operations_source: "Source E", operations_dest: "Dest B", operations_costs: "30.00", operations_categ: "Categ C", operations_validated: true , operations_redundancy: null, operations_userid: 1 },
            { operations_id: 6, operations_name: 'Operation 6', operations_amount: "400.00", operations_source: "Source F", operations_dest: "Dest C", operations_costs: "25.00", operations_categ: "Categ C", operations_validated: false, operations_redundancy: null, operations_userid: 2 }
        ];

        const queries = [
            /* Ordered Test */

            /* Random Test */
            /*  1 */ {"dest": "Dest A"},
            /*  2 */ {"operations_name": "Operation 5"},
            /*  3 */ {"validated": true},
            /*  4 */ {"userid": 1},
            /*  5 */ {"operations_date": "2023-10-06"},
            /*  6 */ {"source": "Source D", "dest": "Dest A"},
            /*  7 */ {"amount": "200.00", "source": "Source A", "dest": "Dest A"},
            /*  8 */ {"amount": "200.00", "source": "Source A", "dest": "Dest D"},
            /*  9 */ {"costs": "25.00", "categ": "Categ B", "validated": false, "redundancy": null, "userid": 2},
            /* 10 */ {"costs": "25.00", "categ": "Categ B", "validated": false, "userid": 2},
            /* 11 */ {"operations_date": null, "operations_name": null, "amount": null, "source": null, "dest": null, "costs": null, "categ": null, "validated": null, "redundancy": null, "createdat": null, "userid": null},
            /* 12 */ {"fakeArg": "fakeValue"},
            /* 13 */ {"costs": "25.00", "categ": "Categ B", "validated": false, "redundancy": "", "userid": 2},
        ];

        const queriesResponses = [
            /* Ordered Test */

            /* Random Test */
            /*  1 */ [ operations[1], operations[3] ],
            /*  2 */ [ operations[4] ],
            /*  3 */ [ operations[0], operations[1], operations[2], operations[4] ],
            /*  4 */ [ operations[0], operations[2], operations[4] ],
            /*  5 */ [ operations[5] ],
            /*  6 */ [ operations[3] ],
            /*  7 */ [ operations[1] ],
            /*  8 */ [],
            /*  9 */ [ operations[3] ],
            /* 10 */ [ operations[3] ],
            /* 11 */ [ operations[0], operations[1], operations[2], operations[3], operations[4], operations[5] ],
            /* 12 */ [ operations[0], operations[1], operations[2], operations[3], operations[4], operations[5] ],
            /* 13 */ [ operations[3] ],
        ];

        for (let i = 0; i < queries.length; i++) {
            console.log("i :", i);

            const query = queries[i];
            const response = await getOperations({ method: "GET", query: query, body: {}, params: {"table": "operations"}, headers: {}, get: jest.fn() } as unknown as Request, { status: (code: number) => ({ json: (data: any) => data }) } as Response);
            const jsonResponse = JSON.parse(JSON.stringify(response));
            const expectedResponse = queriesResponses[i] || [];

            /* Check response */
            expect(response).toBeInstanceOf(Array);
            expect(response).toHaveLength(expectedResponse.length);
        
            jsonResponse.forEach((operation: Object) => {
                if (expectedResponse.length > 0) {
                    expect(operation).toHaveProperty('operations_date');
                    expect(operation).toHaveProperty('operations_createdat');
                }
            });

            for (let j = 0; j < expectedResponse.length; j++) {
                const element = expectedResponse[j];
                expect(response).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining(element),
                    ])
                );
            }
        }
    });
});