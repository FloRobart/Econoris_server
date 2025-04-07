import { executeQuery } from '../database';


/**
 * @class Operation
 */
export class Operation {
    private id: number|null;
    private operations_date: Date;
    private amount: number|null;
    private source: string|null;
    private dest: string|null;
    private costs: number|null;
    private categ: string|null;
    private validated: boolean|null;
    private redundancy: string|null;
    private user_id: number|null;



    /*=============*/
    /* Constructor */
    /*=============*/
    private constructor() {}


    /**
     * @constructor Creates an instance of Operation and inserts it into the database (if Operation is in the database, she will be updated)
     * @param id identifiant généré automatiquement par la base de données
     * - Si l'identifiant est fourni, il sera utilisé pour récupérer l'opération dans la base de données; Les autres paramètres seront utilisés pour mettre à jour l'opération
     * - Si l'identifiant est fourni mais n'existe pas dans la base de données, il est ignoré et une nouvelle opération sera créée
     * - Si l'identifiant n'est pas fourni, il sera généré automatiquement par la base de données
     * @param operations_date date de l'opération
     * @param amount montant de l'opération
     * @param source source de l'opération
     * @param dest destination de l'opération
     * @param costs frais de l'opération
     * @param categ catégorie de l'opération
     * @param validated validitation de l'opération (une opération validée est une opération réalisée, sinon c'est une opération prévue)
     * @param redundancy redondance de l'opération
     * @param user_id identifiant de l'utilisateur qui possède l'opération
     * @returns Operation
     */
    public static async createOperation(id?: number, operations_date?: Date, amount?: number, source?: string, dest?: string, costs?: number, categ?: string, validated?: boolean, redundancy?: string, user_id?: number): Promise<Operation> {
        let operation = new Operation();

        if (id) {
            let rows: any = await executeQuery({
                text: 'SELECT * FROM operations WHERE id = $1',
                values: [id],
            });
            console.log("rows :", rows);
            // TODO: Try to get the operation from the database
            // If the operation is found, update the parameters
            // If the operation is not found, ignore the id and create a new operation

            if (rows && rows.length > 0) {
                operation.setDate(operations_date || rows.operations_date || new Date());
                operation.setAmount(amount || rows.amount || 0);
                operation.setSource(source || rows.source || null);
                operation.setDest(dest || rows.dest || null);
                operation.setCosts(costs || rows.costs || 0);
                operation.setCateg(categ || rows.categ || null);
                operation.setValidated(validated || rows.validated || false);
                operation.setRedundancy(redundancy || rows.redundancy || null);
                operation.setUserId(user_id || rows.user_id || null);

                operation.update();
                return operation;
            }
        }

        operation.operations_date = operations_date || new Date();
        operation.amount = amount || 0;
        operation.source = source || null;
        operation.dest = dest || null;
        operation.costs = costs || 0;
        operation.categ = categ || null;
        operation.validated = validated || false;
        operation.redundancy = redundancy || null;
        operation.user_id = user_id || null;

        operation.insert();
        return operation;
    }



    /*================*/
    /* STATIC METHODS */
    /*================*/
    /**
     * Get all operations with parameters from the database
     * @returns Array of operations
     */
    public static async getOperations(id?: number, operations_date?: Date, amount?: number, source?: string, dest?: string, costs?: number, categ?: string, validated?: boolean, redundancy?: string, user_id?: number, limit?: number): Promise<Operation[]> {
        const operations: Operation[] = [];

        let query = 'SELECT * FROM operations WHERE 1=1';
        const values: any[] = [];
        if (id) {
            query += ' AND id = $' + (values.length + 1);
            values.push(id);
        }
        if (operations_date) {
            query += ' AND operations_date = $' + (values.length + 1);
            values.push(operations_date);
        }
        if (amount) {
            query += ' AND amount = $' + (values.length + 1);
            values.push(amount);
        }
        if (source) {
            query += ' AND source = $' + (values.length + 1);
            values.push(source);
        }
        if (dest) {
            query += ' AND dest = $' + (values.length + 1);
            values.push(dest);
        }
        if (costs) {
            query += ' AND costs = $' + (values.length + 1);
            values.push(costs);
        }
        if (categ) {
            query += ' AND categ = $' + (values.length + 1);
            values.push(categ);
        }
        if (validated) {
            query += ' AND validated = $' + (values.length + 1);
            values.push(validated);
        }
        if (redundancy) {
            query += ' AND redundancy = $' + (values.length + 1);
            values.push(redundancy);
        }
        if (user_id) {
            query += ' AND user_id = $' + (values.length + 1);
            values.push(user_id);
        }
        if (limit) {
            query += ' LIMIT $' + (values.length + 1);
            values.push(limit);
        }
        console.log("query :", query);
        console.log("values :", values);

        const rows: any = await executeQuery({
            text: query,
            values: values,
        });

        console.log("rows :", rows);
        for (const row of rows) {
            const operation = new Operation();
            operation.id = row.id;
            operation.operations_date = row.operations_date;
            operation.amount = row.amount;
            operation.source = row.source;
            operation.dest = row.dest;
            operation.costs = row.costs;
            operation.categ = row.categ;
            operation.validated = row.validated;
            operation.redundancy = row.redundancy;
            operation.user_id = row.user_id;

            operations.push(operation);
        }

        return operations;
    }



    /*=================*/
    /* GETTERS METHODS */
    /*=================*/
    /**
     * Get the id of the operation
     * @returns Id or null
     */
    public getId(): number|null {
        return this.id;
    }

    /**
     * Get the date of the operation
     * @param format ???
     * @returns Date or null
     */
    public getDate(format?: string): Date|null {
        return this.operations_date;
    }

    /**
     * Get the amount of the operation
     * @returns Amount or null
     */
    public getAmount(): number|null {
        return this.amount;
    }

    /**
     * Get the source of the operation
     * @returns Source or null
     */
    public getSource(): string|null {
        return this.source;
    }

    /**
     * Get the destination of the operation
     * @returns Destination or null
     */
    public getDest(): string|null {
        return this.dest;
    }

    /**
     * Get the costs of the operation
     * @returns Costs or null
     */
    public getCosts(): number|null {
        return this.costs;
    }

    /**
     * Get the category of the operation
     * @returns Category or null
     */
    public getCateg(): string|null {
        return this.categ;
    }

    /**
     * Get the validation status of the operation
     * @returns Validation status or null
     */
    public isValidated(): boolean|null {
        return this.validated;
    }

    /**
     * Get the redundancy of the operation
     * @returns Redundancy or null
     */
    public getRedundancy(): string|null {
        return this.redundancy;
    }

    /**
     * Get the user id of the operation
     * @returns User id or null
     */
    public getUserId(): number|null {
        return this.user_id;
    }

    /**
     * Get the status of the operation in the database
     * @returns true if the operation is in the database, otherwise false
     */
    public isInDb(): boolean {
        // TODO: Try to get the operation from the database
        return true;
    }



    /*=================*/
    /* SETTERS METHODS */
    /*=================*/
    /**
     * Set date of the operation
     * @param operations_date Date of the operation
     * @format ???
     */
    public setDate(operations_date: Date): void {
        this.operations_date = operations_date;
    }

    /**
     * Set amount of the operation
     * @param amout Amount of the operation
     * @see update() for saving the operation in the database
     */
    public setAmount(amount: number): void {
        this.amount = amount;
    }

    /**
     * Set source of the operation
     * @param source Source of the operation
     * @see update() for saving the operation in the database
     */
    public setSource(source: string|null): void {
        this.source = source;
    }

    /**
     * Set destination of the operation
     * @param dest Destination of the operation
     * @see update() for saving the operation in the database
     */
    public setDest(dest: string|null): void {
        this.dest = dest;
    }

    /**
     * Set costs of the operation
     * @param costs Costs of the operation
     * @see update() for saving the operation in the database
     */
    public setCosts(costs: number): void {
        this.costs = costs;
    }

    /**
     * Set category of the operation
     * @param categ Category of the operation
     * @see update() for saving the operation in the database
     */
    public setCateg(categ: string|null): void {
        this.categ = categ;
    }

    /**
     * Set validation status of the operation
     * @param validated Validation status of the operation
     * @see update() for saving the operation in the database
     */
    public setValidated(validated: boolean): void {
        this.validated = validated;
    }

    /**
     * Set redundancy of the operation
     * @param redundancy Redundancy of the operation
     * @format ???
     * @see update() for saving the operation in the database
     */
    public setRedundancy(redundancy: string|null): void {
        this.redundancy = redundancy;
    }

    /**
     * Set user id of the operation
     * @param user_id User id of the operation
     * @see update() for saving the operation in the database
     */
    private setUserId(user_id: number|null): void {
        this.user_id = user_id;
    }



    /*==================*/
    /* DATABASE METHODS */
    /*==================*/
    /**
     * Insert the operation into the database
     * @returns true if the operation is inserted successfully, otherwise false
     */
    public async insert(): Promise<boolean> {
        return false;
        try {
            const id = await executeQuery({
                text: 'INSERT INTO operations (operations_date, amount, source, dest, costs, categ, validated, redundancy, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
                values: ['2023-10-01', 100, 'source', 'dest', 10, 'categ', true, false, 1],
            });

            console.log("id :", id);
            this.id = id[0].id;
        } catch (err) {
            console.error(err);
            console.error("\n [❌] FAILED INSERTING OPERATION");
            return false;
        }
        console.log(" [✅] Operation inserted !");
        return true;
    }

    /**
     * Update the operation in the database
     * @returns true if the operation is updated successfully, otherwise false
     */
    public async update(): Promise<boolean> {
        return false;
        try {
            await executeQuery({
                text: 'UPDATE operations SET operations_date = $1, amount = $2, source = $3, dest = $4, costs = $5, categ = $6, validated = $7, redundancy = $8 WHERE id = $9',
                values: [this.operations_date.toString(), this.amount, this.source, this.dest, this.costs, this.categ, this.validated, this.redundancy, this.id],
            });
        } catch (err) {
            console.error(err);
            console.error("\n [❌] FAILED INSERTING OPERATION");
            return false;
        }
        console.log(" [✅] Operation inserted !");
        return true;
    }

    /**
     * Delete the operation from the database
     * @returns true if the operation is deleted successfully, otherwise false
     */
    public delete(): boolean {
        return true;
    }
}