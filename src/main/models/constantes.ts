export const Tables = ["operations", "loans", "timetable"]

/* Operations Columns */
export const OperationsColumns = ["*","id"           ,"date"           ,"name"           ,"amount"           ,"source"           ,"dest"           ,"costs"           ,"categ"           ,"validated"           ,"redundancy"           ,"createdat"           ,"userid",
                                      "operations_id","operations_date","operations_name","operations_amount","operations_source","operations_dest","operations_costs","operations_categ","operations_validated","operations_redundancy","operations_createdat","operations_userid"];
/* Users Columns */
export const UsersColumns = ["*","id"      ,"name"      ,"password"      ,"email"      ,"pp"      ,"macadresse"      ,"ipadresse"      ,"scheduletime"      ,"createdat",
                                 "users_id","users_name","users_password","users_email","users_pp","users_macadresse","users_ipadresse","users_scheduletime","users_createdat"];
/* Loans Columns */
export const LoansColumns = ["*","id"      ,"date"      ,"borrower"      ,"amount"      ,"refundedamount"      ,"loanreason"      ,"createdat"      ,"userid",
                                 "loans_id","loans_date","loans_borrower","loans_amount","loans_refundedamount","loans_loanreason","loans_createdat","loans_userid"];
/* Timetable Columns */
export const TimetableColumns = ["*","id"          ,"timetabledate"          ,"hoursnumber"          ,"hourlyrate"          ,"createdat"          ,"userid",
                                     "timetable_id","timetable_timetabledate","timetable_hoursnumber","timetable_hourlyrate","timetable_createdat","timetable_userid"];

/* All Columns */
export const Columns = {"operations" : OperationsColumns, "loans" : LoansColumns, "timetable" : TimetableColumns};