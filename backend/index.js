//requires
const express = require('express');
      cashier = require('./routes/cashier');
      manager = require('./routes/manager');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
    
// create express app
const app = express();
const port = 3000;

// create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

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