// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// This is going to be inquirer
// Where do i use this though? In the index?


// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
    // SELECT * FROM departments


// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    // SELECT * FROM roles


// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    // SELECT * FROM employees


// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
    // INSERT INTO department 


// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
    // INSERT INTO roles


// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    // INSERT INTO employees


// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
    //UPDATE employee SET role WHERE role.name

const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root99',
        database: 'employees_db'
    },
    console.log('Connected to the database.')
);

function init () {
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
                console.log(answer);
                break;
            case 'Add a role':
                console.log(answer);
                break;
            case 'Add an employee':
                console.log(answer);
                break;
            case 'Update an employee role':
                console.log(answer);
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
    const sql = 'SELECT * FROM departments';

    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err)
        }
        console.log(rows)
    })
    .then(
        init()
    )
}

function allRoles() {
    const sql = 'SELECT * FROM roles';

    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err)
        }
        console.log(rows)
    })
   init();
}

function allEmployees() {
    const sql = 'SELECT * FROM employees';

    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err)
        }
        console.log(rows)
    })
   init();
}

 
init();
