-- Création de la table timetable
CREATE TABLE timetable (
    id SERIAL PRIMARY KEY NOT NULL,
    _date DATE DEFAULT CURRENT_DATE,
    hours_number NUMERIC(4, 2) NOT NULL,
    hourly_rate NUMERIC(10, 2) NOT NULL,
    user_id INTEGER REFERENCES users(id)
);
