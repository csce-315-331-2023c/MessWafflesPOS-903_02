import Router from 'express-promise-router';
import * as db from '../db/connection.js';

const router = new Router();

router.post('/testing', async (req, res) => {
    try {
        res.json(req.body);
    } catch (err) {
        console.log(err);
    }
});

router.get('/inventory', async (req, res) => {
    const result = await db.query("SELECT * FROM inventory");
    res.send(result);
});

export default router;