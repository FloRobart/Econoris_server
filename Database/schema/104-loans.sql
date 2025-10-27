-- ============================================
-- File: 104-loans.sql
-- Description: Create the loans table
-- Author: Floris Robart
-- ============================================



-- Create the loans table to manage user loans
CREATE TABLE loans (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    loan_date DATE DEFAULT CURRENT_DATE,
    amount NUMERIC(12, 2) NOT NULL,
    refunded_amount NUMERIC(12, 2) DEFAULT 0.0,

    borrower VARCHAR(255) NOT NULL,
    reason VARCHAR(255),

    user_id INTEGER NOT NULL,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
