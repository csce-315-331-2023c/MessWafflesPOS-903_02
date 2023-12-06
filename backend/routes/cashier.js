// File: cashier.js
// Handles cashier related api endpoints

import Router from "express-promise-router";
import * as db from "../db/connection.js";

const router = new Router();

// Function: POST /cashier/testing
// Returns the request body
router.post("/testing", async (req, res) => {
    try {
        res.json(req.body);
    } catch (err) {
        console.log(err);
    }
});

// Function: GET /cashier/inventory
// Returns all data from the inventory table
router.get("/inventory", async (req, res) => {
    const result = await db.query("SELECT * FROM inventory");
    res.status(200).send(result);
});

// Function: GET /cashier/items
// Returns all data from the items table
router.get("/items", async (req, res) => {
    const result = await db.query("SELECT * FROM items");
    res.send(result);
});

// Function: GET /cashier/order
// Returns all pending orders from the orders table
router.get("/order", async (req, res) => {
    const result = await db.query(
        "SELECT * FROM orders WHERE status = 'pending' ORDER BY order_number DESC LIMIT 30"
    );
    res.send(result);
});

// Function: POST /cashier/order
// Adds a new order to the database given its item, order date, and total price
router.post("/order", async (req, res) => {
    const { item, order_date, total_price } = req.body;
    for (const it of item) {
        try {
            const ingredients = await db.query(
                "SELECT ingredients FROM items WHERE item = $1",
                [it]
            );
            const ingList = ingredients.rows[0].ingredients;
            for (const ig of ingList) {
                console.log(ig);
                await db.query(
                    "UPDATE inventory SET quantity = quantity -1 WHERE item = $1",
                    [ig]
                );
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    }
    try {
        const orderNumber = await db.query(
            "SELECT order_number FROM orders ORDER BY order_number DESC LIMIT 1"
        );
        const orderNum = orderNumber.rows[0].order_number + 1;
        await db.query(
            "INSERT INTO orders (order_number, item, order_date, total_price,status) VALUES ($1, $2, $3, $4,'pending')",
            [orderNum, item, order_date, total_price]
        );
        res.status(201).send(`Added order ${orderNum}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Function: POST /cashier/updateOrder
// Updates the status of an order given its order number and status
router.post("/updateOrder", async (req, res) => {
    const { order_number,status } = req.body;
    try {
        await db.query(
            "UPDATE orders SET status = $2 WHERE order_number = $1",[order_number,status]
        );
        res.status(201).send(`Updated order ${order_number}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

export default router;
