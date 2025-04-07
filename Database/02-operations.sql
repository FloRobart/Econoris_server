-- Création de la table operations
CREATE TABLE operations (
    id SERIAL PRIMARY KEY NOT NULL,
    operations_date DATE DEFAULT CURRENT_DATE,
    operations_name VARCHAR(255) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    source VARCHAR(255),
    dest VARCHAR(255),
    costs NUMERIC(12, 2) DEFAULT 0.0,
    categ VARCHAR(255),
    validated BOOLEAN NOT NULL,
    redundancy VARCHAR(25),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id)
);
