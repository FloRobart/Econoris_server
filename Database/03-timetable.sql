-- Création de la table schedules
CREATE TABLE schedules (
    schedules_id SERIAL PRIMARY KEY NOT NULL,
    schedules_timetabledate DATE DEFAULT CURRENT_DATE,
    schedules_hoursnumber NUMERIC(4, 2) NOT NULL,
    schedules_hourlyrate NUMERIC(10, 2) NOT NULL,
    schedules_createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    schedules_userid INTEGER
);
