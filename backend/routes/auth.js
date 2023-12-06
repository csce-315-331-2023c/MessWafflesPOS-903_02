import Router from "express-promise-router";
import * as db from "../db/connection.js";

const router = new Router();

// Function: GET /auth/role
// Returns the user's role from the database based on their email
router.get("/role", async (req, res) => {
    const { email } = req.query;
    try {
        const result = await db.query(
            "SELECT role FROM employees WHERE email = $1",
            [email]
        );
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

// Function: GET /auth/employees
// Returns all data from the employees table
router.get("/employees", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM employees ORDER BY id");
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

// Function: POST /auth/employees
// Adds a new employee to the database given their id, name, email, and role
router.post("/employees", async (req, res) => {
    const { id, name, email, role } = req.body;
    try {
        await db.query(
            "INSERT INTO employees (id, name, email, role) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET name = $2, email = $3, role = $4",
            [id, name, email, role]
        );
        res.status(201).send(`Added employee ${name}`);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

// Function: DELETE /auth/employees
// Deletes an employee from the database given their id
router.delete("/employees", async (req, res) => {
    const { id } = req.body;
    try {
        await db.query("DELETE FROM employees WHERE id = $1", [id]);
        res.status(201).send(`Deleted employee ${id}`);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

export default router;
