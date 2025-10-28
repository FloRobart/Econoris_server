-- ============================================
-- File: 101-subscriptions.sql
-- Description: Create the subscriptions table
-- Author: Floris Robart
-- ============================================



-- Create an enum type for subscription interval units
CREATE TYPE subscription_interval_unit AS ENUM ('days', 'weeks', 'months');

-- Create the subscriptions table to manage user subscriptions
CREATE TABLE subscriptions (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label VARCHAR(255) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    source VARCHAR(255),
    destination VARCHAR(255),
    costs NUMERIC(12, 2) NOT NULL DEFAULT 0.0,
    active BOOLEAN NOT NULL DEFAULT TRUE,

    interval_value INTEGER NOT NULL DEFAULT 1,
    interval_unit subscription_interval_unit NOT NULL DEFAULT 'months',
    start_date DATE NOT NULL,
    end_date DATE,
    day_of_month INTEGER DEFAULT 1,

    user_id INTEGER NOT NULL,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,


    -- validations
    CONSTRAINT check_sub_interval_value_positive CHECK (interval_value > 0),
    CONSTRAINT check_sub_day_of_month_range CHECK (
        day_of_month IS NULL OR day_of_month = 0 OR (day_of_month BETWEEN 1 AND 31)
    ),

    -- impose day_of_month non NULL uniquement si unit = 'months'
    CONSTRAINT check_sub_day_required_for_months CHECK (
        (interval_unit = 'months' AND day_of_month IS NOT NULL)
        OR (interval_unit <> 'months')
    ),

    -- date constraints
    CONSTRAINT check_sub_dates_valid CHECK (end_date IS NULL OR end_date >= start_date)
);
