-- Création de la table users
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    users_name VARCHAR(255) NOT NULL,
    users_password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pp BYTEA, -- Utilisation de BYTEA pour stocker des images binaires
    mac_adresse VARCHAR(255),
    ip_adresse INET,
    schedule_time VARCHAR(25),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
