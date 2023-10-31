// backend code here
const express = require('express');
      cashier = require('./routes/cashier');
      manager = require('./routes/manager');
const app = express();
const port = 3000;

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