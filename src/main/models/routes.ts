import { Express } from "express";
import { initOperationsRoutes } from "../routes/operation.routes";


/**
 * Permet d'initialiser les routes de l'application
 * @param app Application Express
 * @returns void
 */
export function initRoutes(app: Express): void {
    /*============*/
    /* Operations */
    /*============*/
    initOperationsRoutes(app);



    /*===========*/
    /*   Loans   */
    /*===========*/
    // initLoansRoutes(app);



    /*=================*/
    /*   Timetable   */
    /*=================*/
    // initTimetableRoutes(app);
}
