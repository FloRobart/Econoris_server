export type JSONSelectRequest = {
    keys: (OperationsType|LoansType|TimetableType)[],
    aggregation?: string,
    limit: number|null|number[]|string|string[],
    offset: number|number[]|string|string[],
    whereValues: WhereValuesType[],
    warnings: string[],
    errors: string[]
}

export type JSONInsertRequest = {
    returnedKeys: (OperationsType|LoansType|TimetableType|"*")[]|null,
    insertions: any,
    warnings: string[],
    errors: string[]
}

export type JSONUpdateRequest = {
    keysValues: any,
    whereValues: WhereValuesType[],
    warnings: string[],
    errors: string[]
}

export type JSONDeleteRequest = {
    whereValues: WhereValuesType[],
    warnings: string[],
    errors: string[]
}

export type JSONResponse = {
    rows: any[],
    warnings: string[],
    errors: string[]
}

export type QueryType = "SELECT" | "INSERT" | "UPDATE" | "DELETE";
export type QueryTable = "operations" | "loans" | "timetable";
export type Query = { text: string; values: (string | number | boolean | null)[]; };
export type AggregationType = "SUM" | "AVG" | "COUNT" | "MAX" | "MIN";
export type ComparisonOperatorType = "=" | ">" | "<" | "<=" | ">=" | "<>" | "!=" | "LIKE";
export type LogicalOperatorType = "AND" | "OR";
export type WhereValuesType = {
    key: OperationsType|LoansType|TimetableType,
    comparisonOperator?: ComparisonOperatorType,
    value: string|number|boolean|null,
    logicalOperator?: LogicalOperatorType
};

/* Operations types */
export type OperationsType = "*"|"id"           |"date"           |"name"           |"amount"           |"source"           |"destination"           |"costs"           |"category"           |"validated"           |"redundancy"           |"createdat"           |"userid"|
                                 "operations_id"|"operations_date"|"operations_name"|"operations_amount"|"operations_source"|"operations_destination"|"operations_costs"|"operations_category"|"operations_validated"|"operations_redundancy"|"operations_createdat"|"operations_userid";

/* Loans types */
export type LoansType = "*"|"id"      |"date"      |"borrower"      |"amount"      |"refundedamount"      |"loanreason"      |"createdat"      |"userid"|
                            "loans_id"|"loans_date"|"loans_borrower"|"loans_amount"|"loans_refundedamount"|"loans_loanreason"|"loans_createdat"|"loans_userid";
/* Timetable types */
export type TimetableType = "*"|"id"          |"timetabledate"          |"hoursnumber"          |"hourlyrate"          |"createdat"          |"userid"|
                                "timetable_id"|"timetable_timetabledate"|"timetable_hoursnumber"|"timetable_hourlyrate"|"timetable_createdat"|"timetable_userid";

export type ColumnsType = OperationsType|LoansType|TimetableType;