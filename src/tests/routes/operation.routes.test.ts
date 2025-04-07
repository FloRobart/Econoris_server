import { connectToDatabase, closeDatabaseConnection, executeQuery, prepareQuery } from "../../main/models/database";


describe("Operations routes test", () => {

    // beforeAll(() => {
    //     /* Mock database connection */
    //     jest.mock("../../main/models/database", () => ({
    //         connectToDatabase: jest.fn(() => Promise.resolve(true)),
    //         executeQuery: jest.fn(() => Promise.resolve([])),
    //         prepareQuery: jest.fn(() => ({
    //             queryType: "SELECT",
    //             table: "operations",
    //             columns: ["*"],
    //             conditions: [],
    //             orderBy: [],
    //             limit: 0,
    //             offset: 0,
    //             countOnly: false,
    //             strict: false,
    //             values: {},
    //         })),
    //     }));
    // });

    afterAll(async () => {
        /* Close database connection */
        await closeDatabaseConnection();
    });


    /**
     * @test Connection to psql database
     */
    test("Connect database", async () => {
        const connection = await connectToDatabase();
        expect(connection).toBe(true);
    });

    /**
     * @test Connection to psql database
     */
    test("Connect database", async () => {
        const connection = await connectToDatabase();
        expect(connection).toBe(true);
    });
});