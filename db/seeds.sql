USE employees_db;

INSERT INTO department (department_name)
VALUES ('Accounting'),
       ('Human resources'),
       ('Engineering'),
       ('Operations');

INSERT INTO role (job_title, department_id, salary)
VALUES ('Sales', 4, 50000),
       ('Engineer', 3, 80000),
       ('Support', 4, 20000),
       ('Accounts Payable', 1, 60000),
       ('Software Engineer', 3, 90000),
       ('Accounts Recievable', 1, 60000);


INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES ('Ali','Aldawoodi', 5, NULL),
       ('John', 'Doe', 1, 1);
    
