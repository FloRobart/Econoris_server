-- ============================================
-- File: 101-operations.sql
-- Description: Create the operations table
-- Author: Floris Robart
-- ============================================



-- Create the operations table to log financial operations for users
CREATE TABLE operations (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    levy_date DATE DEFAULT CURRENT_DATE,
    label VARCHAR(255) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,

    source VARCHAR(255),
    destination VARCHAR(255),
    costs NUMERIC(12, 2) DEFAULT 0.0,
    is_validate BOOLEAN DEFAULT FALSE,

    user_id INTEGER NOT NULL,
    subscription_id INTEGER DEFAULT NULL,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL
);
