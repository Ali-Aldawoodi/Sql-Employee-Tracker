const mysql = require('mysql2');
const inquirer = require('inquirer');
// figlet


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root99',
        database: 'employees_db'
    },
    console.log('Connected to the database.')
);

function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'Menu',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all Employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Quit'
                ]
            }
        ])
        // To be able to select each option, then produce required tables. 
        .then(answers => {
            const answer = answers.choices

            switch (answer) {
                case 'View all departments':
                    allDept();
                    break;

                case 'View all roles':
                    allRoles();
                    break;

                case 'View all Employees':
                    allEmployees();
                    break;

                case 'Add a department':
                    addDept();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Update an employee role':
                    updateEmployee();
                    break;

                case 'Quit':
                    break;
                default:
                    console.log(answer);
            }


        });
};

// functions here
// permisify
function allDept() {
    const sql = 'SELECT * FROM department';

    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err)
        }
        console.table(rows)
        init();
    })

}

function allRoles() {
    const sql = 'SELECT * FROM role';

    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err)
        }
        console.table(rows)
        init();
    })

}

function allEmployees() {
    const sql = 'SELECT * FROM employee';

    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err)
        }
        console.table(rows)
        init();
    })

}

function addDept() {
    const sql = 'INSERT INTO department (department_name) VALUES (?)';
    const sqlShow = 'SELECT * FROM department';

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department you would like to add?'
            }
        ])
        .then(answer => {
            db.query(sql, [answer.departmentName], (err, result) => {
                if (err) {
                    console.error(err)
                }
            })

            db.query(sqlShow, (err, result) => {
                if (err) {
                    console.error(err);
                }
                console.table(result);
                init();
            })

        });
};

function addRole() {
    const sql = 'INSERT INTO role (job_title, department_id, salary) VALUES (?, ?, ?)';
    const sqlShow = 'SELECT * FROM role';
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'jobName',
                message: 'Enter the name for the role that you would like to add.'
            },
            {
                type: 'number',
                name: 'departmentId',
                message: 'Enter the department for the role that you would like to add.'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the salary for the role that you would like to add.'
            }
        ])
        .then(answer => {
            db.query(sql, [answer.jobName, answer.departmentId, answer.salary,], (err, rows) => {
                if (err) {
                    console.error('There is an error here', err)
                } else {
                    console.log('Good to go !');
                }
            })

            db.query(sqlShow, (err, result) => {
                if (err) {
                    console.error(err)
                }
                console.table(result)
                init();
            })
        });
};

function addEmployee() {
    const sql = 'INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?,?,?,?)'
    const sqlShow = 'SELECT * FROM employee';

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name for the employee that you would like to add.'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name for the employee that you would like to add.'
            },
            {
                type: 'number',
                name: 'jobId',
                message: 'Enter the job ID for the employee that you would like to add.'
            },
            {
                type: 'number',
                name: 'managerId',
                message: 'Enter the employees managers ID that you would like to add.'
            },
        ])

        .then(answer => {
            db.query(sql, [answer.firstName, answer.lastName, answer.jobId, answer.managerId], (err, rows) => {
                if (err) {
                    console.error(err)
                } else {
                    console.log('Good to go!')
                }
            })

            db.query(sqlShow, (err, result) => {
                if (err) {
                    console.error(err)
                } console.table(result)
                init();
            })
        });
};



function updateEmployee() {
    const sql = 'UPDATE employee SET job_id = (?) WHERE first_name = (?) AND last_name = (?)';
    const sqlShow = 'SELECT * FROM employee';

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name for the employee that you would like to update.'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name for the employee that you would like to update.'
            },
            {
                type: 'number',
                name: 'jobId',
                message: 'Enter the job ID for the employee that you would like to update.'
            },
            // {
            //     type: 'input',
            //     name: 'lastName',
            //     message: 'Enter the last name for the employee that you would like to update.'
            // },
        ])

        .then(answer => {
            db.query(sql, [answer.jobId, answer.firstName, answer.lastName], (err, rows) => {
                if (err) {
                    console.error(err)
                } else {
                    console.log('Good to go!')
                }
            })

            db.query(sqlShow, (err, result) => {
                if (err) {
                    console.error(err)
                } console.table(result)
                init();
            })
        })
};


init();
