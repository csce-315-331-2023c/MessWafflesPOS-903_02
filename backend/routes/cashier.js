import Router from "express-promise-router";
import * as db from "../db/connection.js";

const router = new Router();

import { auth as jwtAuth } from "express-oauth2-jwt-bearer";
const jwtCheck = jwtAuth({
    audience: "cashier-API",
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: "RS256",
});
router.use(jwtCheck);

router.post("/testing", async (req, res) => {
    try {
        res.json(req.body);
    } catch (err) {
        console.log(err);
    }
});

router.get("/inventory", async (req, res) => {
    const result = await db.query("SELECT * FROM inventory");
    res.status(200).send(result);
});

router.get("/items", async (req, res) => {
    const result = await db.query("SELECT * FROM items");
    res.send(result);
});
router.get("/order", async (req, res) => {
    const result = await db.query(
        "SELECT * FROM orders ORDER BY order_number DESC LIMIT 30"
    );
    res.send(result);
});

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
            "INSERT INTO orders (order_number, item, order_date, total_price) VALUES ($1, $2, $3, $4)",
            [orderNum, item, order_date, total_price]
        );
        res.status(201).send(`Added order ${orderNum}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

export default router;
