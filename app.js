import express from 'express';
import employees from '#db/employees';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello employees!');
});

app.get('/employees', (req, res) => {
  res.json(employees);
});

let lastRandom;
app.get('/employees/random', (req, res) => {
  let employee;
  do {
    employee = employees[Math.floor(Math.random() * employees.length)];
  } while (employees.length > 1 && employee === lastRandom);
  lastRandom = employee;
  res.json(employee);
});

app.get('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((e) => e.id === id);
  if (!employee) {
    return res.status(404).send(`No employee with id ${req.params.id}`);
  }
  res.json(employee);
});

export default app;
