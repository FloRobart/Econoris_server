-- Création de la table operations
CREATE TABLE operations (
    id SERIAL PRIMARY KEY NOT NULL,
    _date DATE DEFAULT CURRENT_DATE,
    amount NUMERIC(12, 2) NOT NULL,
    source VARCHAR(255),
    dest VARCHAR(255),
    costs NUMERIC(12, 2) DEFAULT 0.0,
    categ VARCHAR(255),
    validate BOOLEAN NOT NULL,
    redundancy VARCHAR(25),
    user_id INTEGER REFERENCES users(id)
);
