-- Création de la table users
CREATE TABLE users (
    users_id SERIAL PRIMARY KEY NOT NULL,
    users_name VARCHAR(255) NOT NULL,
    users_password VARCHAR(255) NOT NULL,
    users_email VARCHAR(255) NOT NULL UNIQUE,
    users_pp BYTEA, -- Utilisation de BYTEA pour stocker des images binaires
    users_macadresse VARCHAR(255),
    users_ipadresse INET,
    users_scheduletime VARCHAR(25),
    users_createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
