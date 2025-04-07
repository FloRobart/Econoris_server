-- Insertion des utilisateurs de test
INSERT INTO users (users_name, users_password, email, pp, mac_adresse, ip_adresse, schedule_time) VALUES
    ('User 1', 'password', 'user1@gmail.com', null, null, null, null),
    ('User 2', 'password', 'user2@gmail.com', null, null, null, null)
    ON CONFLICT DO NOTHING;

-- Insertion des opérations de test
INSERT INTO operations (operations_date, operations_name, amount, source, dest, costs, categ, validated, redundancy, user_id) VALUES
    ('2023-10-01', 'Operation 1', 100.00, 'Source A', 'Dest B', 10.00, 'Categ A', true, null, 1),
    ('2023-10-02', 'Operation 2', 200.00, 'Source A', 'Dest A', 20.00, 'Categ B', true, null, 2),
    ('2023-10-03', 'Operation 3', 150.00, 'Source C', 'Dest C', 15.00, 'Categ B', true, null, 1),
    ('2023-10-04', 'Operation 4', 250.00, 'Source D', 'Dest A', 25.00, 'Categ B', false, null, 2),
    ('2023-10-05', 'Operation 5', 300.00, 'Source E', 'Dest B', 30.00, 'Categ C', true, null, 1),
    ('2023-10-06', 'Operation 6', 400.00, 'Source F', 'Dest C', 40.00, 'Categ C', false, null, 2),
    ON CONFLICT DO NOTHING;

-- Insertion loans de test
INSERT INTO loans (loans_date, borrower, amount, refunded_amount, loan_reason, user_id) VALUES
    ('2023-10-01', 'User 1', 1000.00, 0.00, 'Loan for project A', 1),
    ('2023-10-02', 'User 2', 2000.00, 500.00, 'Loan for project B', 2),
    ('2023-10-03', 'User 1', 1500.00, 300.00, 'Loan for project C', 1),
    ('2023-10-04', 'User 2', 2500.00, 1000.00, 'Loan for project D', 2),
    ON CONFLICT DO NOTHING;