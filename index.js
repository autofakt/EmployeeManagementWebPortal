const express = require('express');
const employeeDatabase = require("./employeeDatabase.js");

const app = express();

app.use(express.json());
app.use(express.static('public'));



/*
  PART 0 - EMPLOYEE DATABASE INFORMATION

  You will see an employeeDatabase module above that can be used for working
  with employee data. This module does not actually store anything in a
  permanent database. Instead, it stores data in memory using a JavaScript array.
  From your perspective, it doesn't matter how or where the data is stored. The module function definitions and descriptions are below.
  You will need them for the CRUD endpoints (GET, POST, PUT, DELETE) you create below.

    - employeeDatabase.getEmployees()
      - Description: Returns all employees in the database.
      - Return: Array of employee objects

    - employeeDatabase.getEmployee(id: Integer)
      - Description: Returns a single employee based an id
      - Return: Employee object if found, null if not found.

    - employeeDatabase.updatetEmployee(id: Integer, EmpObj: Object)
      - Description: Updates an employee based on an id
      - Return: Updated employee object if found and updated, null if not found.

    - employeeDatabase.deleteEmployee(id: Integer)
      - Description: Deletes an employee based on an id
      - Return: Deleted employee if found and deleted. null if not found.

    - employeeDatabase.addEmployee(EmpObj: Object)
      - Description: Adds a new employee to the database
      - Return: New employee that was added.
*/





/*
  PART 1 - GET /api/employees

  Create a GET endpoint '/api/employees' returns all employees to the client.
  Once you implement this endpoint, the client should load with some initial data.

  * Use the appropriet employeeDatabase function.

  * Send a 200 OK status code with the employee data.
*/

app.get('/api/employees', function (req, res) {
  res.status(200);
  res.send(employeeDatabase.getEmployees());
});


/*
  PART 2 - GET /api/employees/:id
  
  Create a GET endpoint '/api/employees/:id' that retrieves a single employee
  and returns it to the client.

  * Use the appropriet employeeDatabase function. Be careful of the function argument type!

  * Send a 200 OK status code with the employee data if the employee is found.
  
  * Send a 404 Not Found status code if the employee is not found.
*/

app.get('/api/employees/:id', function (req, res) {

  const id = parseInt(req.params.id);

  if (employeeDatabase.getEmployee(id)) {
    res.status(200);
    res.send(employeeDatabase.getEmployee(id));
  }
  else {
    res.status(404);
    res.send("No such user");
  }

})

/*
  PART 3 - PUT /api/employees/:id
  
  Create a PUT endpoint '/api/employees/:id' that updates a single employee
  and returns the updated employee to the client.

  * Use the appropriet employeeDatabase function. Be careful of the function argument type!

  * Send a 200 OK status code with the updated employee data if the employee is
     found and updated.

  * Send a 400 Bad Request status code with an appropriate message if the employee
     to be updated has an empty name or email property.
*/

app.put('/api/employees/:id', function (req, res) {
  const id = parseInt(req.params.id);

  if (employeeDatabase.getEmployee(id)) {
    res.status(200);
    res.send(employeeDatabase.updateEmployee(id, req.body));
  }
  else {
    res.status(404);
    res.send("No such user");
  }
})



/*
  PART 4 - DELETE /api/employees/:id
  
  Create a DELETE endpoint '/api/employees/:id' that deletes a single employee and
  returns the deleted record to the client 

  * Use the appropriet employeeDatabase function. Be careful of the function argument type!

  * Send a 200 OK status code with the deleted Employee if the employee is found and deleted.

  * Send a 404 Not Found status code with an appropriate error if the Employee is not found.
*/

app.delete("/api/employees/:id", function(req, res) {
  const id = parseInt(req.params.id)
  let removedEmployee = employeeDatabase.getEmployee(id);
  employeeDatabase.deleteEmployee(id);

   if (removedEmployee) {
      res.status(200).send(removedEmployee);
   } else {
      res.status(404).send("Not Deleted");
   }
});


/*
  PART 5 - POST /api/employees
  
  Create a POST endpoint '/api/employees' that creates a new employee and returns
  the newly created record to the client.

  * Use the appropriet employeeDatabase function.

  * Send a 201 Created status code with the new employee if the employee has
     successfully been created.

  * Send a 400 Bad Request status code with an appropriate message if the Employee
    to be created has an empty name or email property.
*/

app.post("/api/employees", function(req, res) {
  let newEmployee = req.body;

   if (newEmployee.name ==="" || newEmployee.email ==="") {
      res.status(404).send("Empty name or email");
   } else {
     employeeDatabase.addEmployee(newEmployee);
      res.status(200).send(newEmployee);
   }
});

//app.listen(3000, () => console.log('server started'));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
  console.log('server started')
}
app.listen(port);
