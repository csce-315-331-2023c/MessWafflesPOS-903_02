// File: routes.js
// Merges all api endpoints

import express from "express";
import cashier from "./cashier.js";
import manager from "./manager.js";
import auth from "./auth.js";

// Function: mountRoutes
// Mounts all routes (/cashier, /manager, /auth) to the express app
const mountRoutes = (app) => {
    app.use(express.json());
    app.use("/cashier", cashier);
    app.use("/manager", manager);
    app.use("/auth", auth);
    // add more routes here
};

export default mountRoutes;
