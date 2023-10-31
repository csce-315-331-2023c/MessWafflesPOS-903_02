// package requires
import express from 'express';

// file requires
import cashier from './routes/cashier.js';
import manager from './routes/manager.js';
import pool from './db/connection.js';

// create express app
const app = express();
const port = 3000;

// check connection
var connected = true;
pool.connect()
    .catch(err => {
        console.log('Error connecting to database', err.stack);
        connected = false;
    })
    .then(() => {
        if (connected) {
            console.log('Successfully connected to database');
        }
    });

// close pool on close
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/user', (req, res) => {
    res.send('Hi User!')
});

app.use('/cashier', cashier);
app.use('/manager', manager);

app.listen(port, () => {
    console.log('Server listening at http://localhost:${port}');
});