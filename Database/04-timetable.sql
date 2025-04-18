-- Création de la table timetable
CREATE TABLE timetable (
    timetable_id SERIAL PRIMARY KEY NOT NULL,
    timetable_timetabledate DATE DEFAULT CURRENT_DATE,
    timetable_hoursnumber NUMERIC(4, 2) NOT NULL,
    timetable_hourlyrate NUMERIC(10, 2) NOT NULL,
    timetable_createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    timetable_userid INTEGER
);
