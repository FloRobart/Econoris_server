-- Création de la table operations
CREATE TABLE operations (
    operations_id SERIAL PRIMARY KEY NOT NULL,
    operations_date DATE DEFAULT CURRENT_DATE,
    operations_name VARCHAR(255) NOT NULL,
    operations_amount NUMERIC(12, 2) NOT NULL,
    operations_source VARCHAR(255),
    operations_dest VARCHAR(255),
    operations_costs NUMERIC(12, 2) DEFAULT 0.0,
    operations_categ VARCHAR(255),
    operations_validated BOOLEAN NOT NULL,
    operations_redundancy VARCHAR(25),
    operations_createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    operations_userid INTEGER
);
