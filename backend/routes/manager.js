// File: manager.js
// Handles manager related api endpoints

import Router from 'express-promise-router';
import * as db from '../db/connection.js';

const router = new Router();

// Function: GET /manager/items
// Returns all data from the items table
router.get('/items', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM items ORDER BY item");
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Function: POST /manager/items
// Adds or updates a new item to the database given its name, price, ingredients, category, picture, and description
router.post('/items', async(req,res) => {
    const{item,price,ingredients,category,picture,description} = req.body
    try{
        // for(let i = 0; i < ingredients.length;i++){
        //     thisIng = ingredients[i]
        //     const thisItem = await db.query("SELECT * FROM inventory WHERE item = $1",[thisIng]);
        //     if(thisItem.rowCount == 0){
        //         await db.query('INSERT INTO inventory (item, quantity) VALUES ($1, 0)',[thisIng]);
        //     }
        // }
        var i = ingredients.substring(1,ingredients.length-1)
        const iList = i.split(',')
        //console.log(iList[2])
        for(let j = 0; j < iList.length;j++){
            var ing = iList[j].trim()
            const thisItem = await db.query("SELECT * FROM inventory WHERE item = $1",[ing]);
            if(thisItem.rowCount == 0){
                await db.query('INSERT INTO inventory (item, quantity) VALUES ($1, 0)',[ing]);
            }
        }
        await db.query('INSERT INTO items (item, price, ingredients, category, picture, description) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (item) DO UPDATE SET price = $2, ingredients = $3, category = $4, picture = $5, description = $6',[item,price,ingredients,category,picture,description])
        res.status(201).send(`Added item ${item}`)
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Function: POST /manager/setItemWeatherType
// Sets the weather type of an item given its name and weather type
router.post('/setItemWeatherType', async(req,res) => {
    const{item,weather_type} = req.body
    try{
        await db.query('UPDATE items SET weather_type = $2 WHERE item = $1',[item,weather_type])
        res.status(201).send(`Added item ${item}`)
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Function: DELETE /manager/items
// Deletes an item from the database given its name
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

// Function: GET /manager/inventory
// Returns all data from the inventory table
router.get('/inventory', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM inventory ORDER BY item");
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Function: POST /manager/inventory
// Adds or updates a new ingredient to the database given its name and quantity
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

// Function: DELETE /manager/inventory
// Deletes an ingredient from the database given its name
router.delete('/inventory', async(req,res) => {
    console.log(req.body)
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

// Function: GET /manager/orders
// Returns orders from the orders table given a date range
router.get('/orders', async(req, res) => {
    const{date1, date2} = req.query;
    console.log(date1, date2);
    try {
        const result = await db.query("SELECT item FROM orders WHERE order_date::date >= $1 AND order_date::date <= $2", [date1, date2]);
        res.send(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})

// Function: DELETE /manager/orders
// Deletes an order from the database given its order number
router.delete('/order', async(req,res) => {
    console.log(req.body)
    const{order_number} = req.body
    try{
        await db.query('DELETE FROM orders WHERE order_number = $1',[order_number])
        res.status(201).send(`Deleted order ${order_number}`)
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Function: GET /manager/restockReport
// Returns all data from the inventory table where the quantity is less than a given quantity
router.get('/restockReport', async (req, res) => {
    const{quantity} = req.query
    try {
        const result = await db.query('SELECT * FROM inventory WHERE quantity < $1',[quantity]);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Function: GET /manager/dateOrders
// Returns orders from the orders table on a given date
router.get('/dateOrders', async(req, res) => {
    const{date} = req.query;
    try {
        const result = await db.query("SELECT * FROM orders WHERE order_date::date = $1", [date]);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error")
    }
});
export default router;