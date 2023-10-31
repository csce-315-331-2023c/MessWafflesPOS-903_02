import Router from 'express-promise-router';
import * as db from '../db/connection.js';

const router = new Router();

// example route
router.get('/items', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM items");
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.get('/inventory', async (req, res) => {
    const result = await db.query("SELECT * FROM inventory");
    res.send(result);
});

export default router;