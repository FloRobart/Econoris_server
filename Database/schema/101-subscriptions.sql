-- ============================================
-- File: 101-subscriptions.sql
-- Description: Create the subscriptions table
-- Author: Floris Robart
-- ============================================



-- Create the subscriptions table to manage user subscriptions
CREATE TABLE subscriptions (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,

    label VARCHAR(255) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,

    frequency VARCHAR(20) NOT NULL CHECK (
        frequency IN ('monthly', 'bimonthly', 'quarterly', 'semiannual', 'annual', 'custom')
    ),

    start_date DATE NOT NULL,
    end_date DATE,
    next_levy_date DATE NOT NULL,
    day_of_month INTEGER NOT NULL CHECK (day_of_month BETWEEN 1 AND 31),

    custom_interval_months INTEGER DEFAULT NULL,
    source VARCHAR(255),
    destination VARCHAR(255),
    costs NUMERIC(12, 2) DEFAULT 0.0,
    active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
