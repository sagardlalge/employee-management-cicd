const express = require("express");

const app = express();

app.use(express.json());

const employees = [
    {
        id: 1,
        name: "Sagar",
        department: "DevOps"
    },
    {
        id: 2,
        name: "Rahul",
        department: "QA"
    }
];

app.get("/", (req, res) => {
    res.send("Employee Management API Running");
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP"
    });
});

app.get("/employees", (req, res) => {
    res.json(employees);
});

app.post("/employees", (req, res) => {

    const employee = {
        id: employees.length + 1,
        name: req.body.name,
        department: req.body.department
    };

    employees.push(employee);

    res.status(201).json(employee);
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
