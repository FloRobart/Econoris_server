-- ============================================
-- File: 103-work_hours.sql
-- Description: Create the work_hours table
-- Author: Floris Robart
-- ============================================



-- Create the work_hours table to log work hours for users
CREATE TABLE work_hours (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    work_date DATE NOT NULL,

    start_time TIME,
    end_time TIME,
    hours_number NUMERIC(4, 2) GENERATED ALWAYS AS (
        EXTRACT(EPOCH FROM (end_time - start_time)) / 3600
    ) STORED,

    hourly_rate NUMERIC(10, 2) NOT NULL,

    user_id INTEGER NOT NULL,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
