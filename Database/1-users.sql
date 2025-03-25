-- Création de la table users
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    _name VARCHAR(255) NOT NULL,
    _password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pp BYTEA, -- Utilisation de BYTEA pour stocker des images binaires
    mac_adresse VARCHAR(255),
    ip_adresse INET NOT NULL,
    schedule_time VARCHAR(25),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
