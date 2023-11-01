// package requires
import express from 'express';
import cors from 'cors';

// file requires
import { pool } from './db/connection.js';
import mountRoutes from './routes/routes.js';

const port = 5000;

// create express app
const app = express();

// cors stuff for frontend
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })

// mount routes (cashier, manager, etc.)
mountRoutes(app);

// check connection
var connected = true;
pool.connect()
    .catch(err => {
        console.log('error connecting to db: ', err.stack);
        connected = false;
    })
    .then(() => {
        if (connected) {
            console.log('connected to db');
        }
    });

// close pool on app close
process.on('SIGINT', function() {
    pool.end();
    console.log('shutdown');
    process.exit(0);
});

// start application
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});