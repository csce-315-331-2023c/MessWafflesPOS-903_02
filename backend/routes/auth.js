import Router from "express-promise-router";
import * as db from "../db/connection.js";

const router = new Router();

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

export default router;
