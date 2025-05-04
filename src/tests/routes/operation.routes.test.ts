import { Request, Response } from 'express';
import { connectToDatabase, closeDatabaseConnection, executeQuery } from "../../main/models/database";
import * as SelectController from "../../main/controllers/SelectController";
import http from "http";
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

describe("Operations routes test", () => {
    const operations = [
        { operations_id: 1, operations_name: 'Operation 1', operations_amount: "100.00", operations_source: "Source A", operations_dest: "Dest B", operations_costs: "10.00", operations_categ: "Categ A", operations_validated: true , operations_redundancy: null, operations_userid: 1 },
        { operations_id: 2, operations_name: 'Operation 2', operations_amount: "200.00", operations_source: "Source A", operations_dest: "Dest A", operations_costs: "20.00", operations_categ: "Categ B", operations_validated: true , operations_redundancy: null, operations_userid: 2 },
        { operations_id: 3, operations_name: 'Operation 3', operations_amount: "150.00", operations_source: "Source C", operations_dest: "Dest C", operations_costs: "15.00", operations_categ: "Categ B", operations_validated: true , operations_redundancy: null, operations_userid: 1 },
        { operations_id: 4, operations_name: 'Operation 4', operations_amount: "250.00", operations_source: "Source D", operations_dest: "Dest A", operations_costs: "25.00", operations_categ: "Categ B", operations_validated: false, operations_redundancy: null, operations_userid: 2 },
        { operations_id: 5, operations_name: 'Operation 5', operations_amount: "300.00", operations_source: "Source E", operations_dest: "Dest B", operations_costs: "30.00", operations_categ: "Categ C", operations_validated: true , operations_redundancy: null, operations_userid: 1 },
        { operations_id: 6, operations_name: 'Operation 6', operations_amount: "400.00", operations_source: "Source F", operations_dest: "Dest C", operations_costs: "25.00", operations_categ: "Categ C", operations_validated: false, operations_redundancy: null, operations_userid: 2 }
    ];



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

        /* Create tables */
        await executeQuery({
            text:  `-- Création de la table operations
                    CREATE TABLE operations (
                        operations_id SERIAL PRIMARY KEY NOT NULL,
                        operations_date DATE DEFAULT CURRENT_DATE,
                        operations_name VARCHAR(255) NOT NULL,
                        operations_amount NUMERIC(12, 2) NOT NULL,
                        operations_source VARCHAR(255),
                        operations_dest VARCHAR(255),
                        operations_costs NUMERIC(12, 2) DEFAULT 0.0,
                        operations_categ VARCHAR(255),
                        operations_validated BOOLEAN DEFAULT TRUE,
                        operations_redundancy VARCHAR(25),
                        operations_createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        operations_userid INTEGER
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
                        loans_userid INTEGER
                    );
                    
                    -- Création de la table timetable
                    CREATE TABLE timetable (
                        timetable_id SERIAL PRIMARY KEY NOT NULL,
                        timetable_timetabledate DATE DEFAULT CURRENT_DATE,
                        timetable_hoursnumber NUMERIC(4, 2) NOT NULL,
                        timetable_hourlyrate NUMERIC(10, 2) NOT NULL,
                        timetable_createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        timetable_userid INTEGER
                    );`
            , values: []
        });

        /* Insert values in the database */
        await executeQuery({
            text:  `-- Insertion des opérations de test
                INSERT INTO operations (operations_date, operations_name, operations_amount, operations_source, operations_dest, operations_costs, operations_categ, operations_validated, operations_redundancy, operations_userid) VALUES
                    ('2025-10-01', 'Operation 1', 100.00, 'Source A', 'Dest B', 10.00, 'Categ A', true, null, 1),
                    ('2025-10-02', 'Operation 2', 200.00, 'Source A', 'Dest A', 20.00, 'Categ B', true, null, 2),
                    ('2025-10-03', 'Operation 3', 150.00, 'Source C', 'Dest C', 15.00, 'Categ B', true, null, 1),
                    ('2025-10-04', 'Operation 4', 250.00, 'Source D', 'Dest A', 25.00, 'Categ B', false, null, 2),
                    ('2025-10-05', 'Operation 5', 300.00, 'Source E', 'Dest B', 30.00, 'Categ C', true, null, 1),
                    ('2025-10-06', 'Operation 6', 400.00, 'Source F', 'Dest C', 25.00, 'Categ C', false, null, 2);

                -- Insertion loans de test
                INSERT INTO loans (loans_date, loans_borrower, loans_amount, loans_refundedamount, loans_loanreason, loans_userid) VALUES
                    ('2025-10-01', 'User 1', 1000.00, 0.00, 'Loan for project A', 1),
                    ('2025-10-02', 'User 2', 2000.00, 500.00, 'Loan for project B', 2),
                    ('2025-10-03', 'User 1', 1500.00, 300.00, 'Loan for project C', 1),
                    ('2025-10-04', 'User 2', 2500.00, 1000.00, 'Loan for project D', 2);`
            , values: []
        });
    });

    afterEach(async () => {
        
    });



    /**
     * @test 
     */
    test("Test operations", async () => {
        const queries = [
            /* Random Tests */
            /*  1 */ {"dest": "Dest A"},
            /*  2 */ {"operations_name": "Operation 5"},
            /*  3 */ {"validated": true},
            /*  4 */ {"userid": 1},
            /*  5 */ {"operations_date": "2025-10-06"},
            /*  6 */ {"source": "Source D", "dest": "Dest A"},
            /*  7 */ {"amount": "200.00", "source": "Source A", "dest": "Dest A"},
            /*  8 */ {"amount": "200.00", "source": "Source A", "dest": "Dest D"},
            /*  9 */ {"costs": "25.00", "categ": "Categ B", "validated": false, "redundancy": null, "userid": 2},
            /* 10 */ {"costs": "25.00", "categ": "Categ B", "validated": false, "userid": 2},
            /* 11 */ {"operations_date": null, "operations_name": null, "amount": null, "source": null, "dest": null, "costs": null, "categ": null, "validated": null, "redundancy": null, "createdat": null, "userid": null},
            /* 12 */ {"fakeArg": "fakeValue"},
            /* 13 */ {"costs": "25.00", "categ": "Categ B", "validated": false, "redundancy": "", "userid": 2},
            /* 14 */ {"dest": ["Dest C", "Dest A", "Dest B"]},

            /* Column Tests */
            /* 15 */ {},
            /* 16 */ {"id": 1},
            /* 17 */ {"operations_id": 2},
            /* 18 */ {"name": "Operation 1"},
            /* 19 */ {"operations_name": "Operation 2"},
            /* 20 */ {"amount": "200"},
            /* 21 */ {"operations_amount": "200.0"},
            /* 22 */ {"source": "Source A"},
            /* 23 */ {"operations_source": "Source C"},
            /* 24 */ {"dest": "Dest B"},
            /* 25 */ {"operations_dest": "Dest B"},
            /* 26 */ {"costs": "25.00"},
            /* 27 */ {"operations_costs": "25.00"},
            /* 28 */ {"categ": "Categ B"},
            /* 29 */ {"operations_categ": "Categ C"},
            /* 30 */ {"validated": true},
            /* 31 */ {"operations_validated": false},
            /* 32 */ {"redundancy": null},
            /* 33 */ {"operations_redundancy": null},
            /* 34 */ {"userid": 1},
            /* 35 */ {"operations_userid": 2},

            /* Body Tests */

        ];

        const queriesResponses = [
            /* Random Tests result */
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
            /* 14 */ [ operations[0], operations[4] ],

            /* Column Tests result */
            /* 15 */ [ operations[0], operations[1], operations[2], operations[3], operations[4], operations[5] ],
            /* 16 */ [ operations[0] ],
            /* 17 */ [ operations[1] ],
            /* 18 */ [ operations[0] ],
            /* 19 */ [ operations[1] ],
            /* 20 */ [ operations[1] ],
            /* 21 */ [ operations[1] ],
            /* 22 */ [ operations[0], operations[1] ],
            /* 23 */ [ operations[2] ],
            /* 24 */ [ operations[0], operations[4] ],
            /* 25 */ [ operations[0], operations[4] ],
            /* 26 */ [ operations[3], operations[5] ],
            /* 27 */ [ operations[3], operations[5] ],
            /* 28 */ [ operations[1], operations[2], operations[3] ],
            /* 29 */ [ operations[4], operations[5] ],
            /* 30 */ [ operations[0], operations[1], operations[2], operations[4] ],
            /* 31 */ [ operations[3], operations[5] ],
            /* 32 */ [ operations[0], operations[1], operations[2], operations[3], operations[4], operations[5] ],
            /* 33 */ [ operations[0], operations[1], operations[2], operations[3], operations[4], operations[5] ],
            /* 34 */ [ operations[0], operations[2], operations[4] ],
            /* 35 */ [ operations[1], operations[3], operations[5] ],
        ];

        for (let i = 0; i < queries.length; i++) {
            console.log("i :", i);

            /* Route code */
            const jsonRequest = SelectController.parseSelectUrl("operations", queries[i]);
            const response = await SelectController.executeSelect("operations", jsonRequest);
            const jsonResponse = JSON.parse(JSON.stringify(response));
            const expectedResponse = queriesResponses[i] || [];
            /* End route code */

            expect(jsonResponse).toHaveProperty("rows");
            expect(jsonResponse).toHaveProperty("warnings");
            expect(jsonResponse).toHaveProperty("errors");

            /* Check response rows */
            expect(jsonResponse.rows).toBeInstanceOf(Array);
            expect(jsonResponse.rows).toHaveLength(expectedResponse.length);
        
            jsonResponse.rows.forEach((operation: Object) => {
                if (expectedResponse.length > 0) {
                    expect(operation).toHaveProperty('operations_date');
                    expect(operation).toHaveProperty('operations_createdat');
                }
            });

            for (let j = 0; j < expectedResponse.length; j++) {
                const element = expectedResponse[j];
                expect(jsonResponse.rows).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining(element),
                    ])
                );
            }
        }
    });
});