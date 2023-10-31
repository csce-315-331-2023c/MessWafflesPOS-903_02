import express from 'express';
import pool from '../db/connection.js';
const router = express.Router();

// example route
router.get('/items', (req, res) => {
    pool.query("SELECT * FROM items", function (err, result){
        if(err) throw err;
        res.send(result);
    });
});

router.get('/inventory', (req, res) => {
    pool.query("SELECT * FROM inventory", function (err, result){
        if(err) throw err;
        res.send(result);
    });
});

export default router;