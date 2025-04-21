-- Création de la table loans
CREATE TABLE loans (
    loans_id SERIAL PRIMARY KEY NOT NULL,
    loans_date DATE DEFAULT CURRENT_DATE,
    loans_borrower VARCHAR(255) NOT NULL,
    loans_amount NUMERIC(12, 2) NOT NULL,
    loans_refundedamount NUMERIC(12, 2) DEFAULT 0.0,
    loans_loanreason VARCHAR(255),
    loans_createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    loans_userid INTEGER
);
