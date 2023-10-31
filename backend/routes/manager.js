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

router.post('/inventory', async(req,res) => {
    const{item,quantity} = req.body
    try{
        await db.query('INSERT INTO inventory (item, quantity) VALUES ($1, $2)',[item,quantity])
        res.status(201).send(`Added ingredient ${item}`)
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.get('/inventory', async (req, res) => {
    const result = await db.query("SELECT * FROM inventory");
    res.send(result);
});

export default router;