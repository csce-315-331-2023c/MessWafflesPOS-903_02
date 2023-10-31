import express from 'express';
import cashier from './cashier.js';
import manager from './manager.js';

const mountRoutes = (app) => {
    app.use(express.json());
    app.use('/cashier', cashier);
    app.use('/manager', manager);
    // add more routes here
}

export default mountRoutes;