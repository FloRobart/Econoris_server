-- ============================================
-- File: 201-update_updated_at.sql
-- Description: Triggers to update updated_at columns on row updates
-- Author: Floris Robart
-- ============================================



-- Trigger on the subscriptions table to update the updated_at column on row updates
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Trigger on the operations table to update the updated_at column on row updates
DROP TRIGGER IF EXISTS update_operations_updated_at ON operations;
CREATE TRIGGER update_operations_updated_at
BEFORE UPDATE ON operations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Trigger on the work_hours table to update the updated_at column on row updates
DROP TRIGGER IF EXISTS update_work_hours_updated_at ON work_hours;
CREATE TRIGGER update_work_hours_updated_at
BEFORE UPDATE ON work_hours
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Trigger on the loans table to update the updated_at column on row updates
DROP TRIGGER IF EXISTS update_loans_updated_at ON loans;
CREATE TRIGGER update_loans_updated_at
BEFORE UPDATE ON loans
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();