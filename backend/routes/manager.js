import Router from 'express-promise-router';
import * as db from '../db/connection.js';

const router = new Router();

// example route
router.get('/items', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM items ORDER BY item");
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.post('/items', async(req,res) => {
    const{item,price,ingredients,category} = req.body
    try{
        await db.query('INSERT INTO items (item, price, ingredients, category) VALUES ($1, $2, $3, $4) ON CONFLICT (item) DO UPDATE SET price = $2, ingredients = $3, category = $4',[item,price,ingredients,category])
        res.status(201).send(`Added item ${item}`)
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.delete('/items', async(req,res) => {
    const{item} = req.body
    try{
        await db.query('DELETE FROM items WHERE item = $1',[item])
        res.status(201).send(`Deleted item ${item}`)
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.get('/inventory', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM inventory ORDER BY item");
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.post('/inventory', async(req,res) => {
    const{item,quantity} = req.body
    try{
        await db.query('INSERT INTO inventory (item, quantity) VALUES ($1, $2) ON CONFLICT (item) DO UPDATE SET quantity = $2',[item,quantity])
        res.status(201).send(`Added ingredient ${item}`)
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.delete('/inventory', async(req,res) => {
    const{item} = req.body
    try{
        await db.query('DELETE FROM inventory WHERE item = $1',[item])
        res.status(201).send(`Deleted ingredient ${item}`)
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
export default router;