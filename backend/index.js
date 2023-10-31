// package requires
import express from 'express';

// file requires
import { pool } from './db/connection.js';
import mountRoutes from './routes/routes.js';

const port = 3000;

// create express app and mount routes
const app = express();
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