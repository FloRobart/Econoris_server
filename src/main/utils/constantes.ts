export const Tables = ["operations", "loans", "timetable"]

/* Operations Columns */
export const OperationsColumns = ["id"           ,"date"           ,"name"           ,"amount"           ,"source"           ,"destination"           ,"costs"           ,"category"           ,"validated"           ,"redundancy"           ,"createdat"           ,"userid",
                                  "operations_id","operations_date","operations_name","operations_amount","operations_source","operations_destination","operations_costs","operations_category","operations_validated","operations_redundancy","operations_createdat"];

/* Loans Columns */
export const LoansColumns = ["id"      ,"date"      ,"borrower"      ,"amount"      ,"refundedamount"      ,"loanreason"      ,"createdat"      ,"userid",
                             "loans_id","loans_date","loans_borrower","loans_amount","loans_refundedamount","loans_loanreason","loans_createdat"];
/* Timetable Columns */
export const TimetableColumns = ["id"          ,"timetabledate"          ,"hoursnumber"          ,"hourlyrate"          ,"createdat"          ,"userid",
                                 "timetable_id","timetable_timetabledate","timetable_hoursnumber","timetable_hourlyrate","timetable_createdat"];

/* All Columns */
export const Columns = {"operations" : OperationsColumns, "loans" : LoansColumns, "timetable" : TimetableColumns};

/* Comparison operator */
export const ComparisonOperator = ["=", ">", "<", ">=", "<=", "<>", "!=", "LIKE"];

/* Logical operator */
export const LogicalOperator = ["AND", "OR"];

/* Aggregation operator */
export const AggregationOperator = ["SUM", "AVG", "COUNT", "MAX", "MIN"];
