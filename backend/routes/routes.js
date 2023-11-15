import express from "express";
import cashier from "./cashier.js";
import manager from "./manager.js";
import auth from "./auth.js";

const mountRoutes = (app) => {
    app.use(express.json());
    app.use("/cashier", cashier);
    app.use("/manager", manager);
    app.use("/auth", auth);
    // add more routes here
};

export default mountRoutes;
