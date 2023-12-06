/* File: index.js
   Entry point for backend server

   1. Starts an express app on port 5000

   2. Connects to postgres database

   3. Mounts routes to express app
   
   4. Begins listening for requests
*/

// package requires
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// file requires
import { pool } from "./db/connection.js";
import mountRoutes from "./routes/routes.js";

const port = 5000;

// create express app
const app = express();

// cors stuff for frontend
app.use(cors());

app.get("/", (req, res) => {
    console.log("hello!");
    res.send("hello!");
});

// mount routes (cashier, manager, etc.)
mountRoutes(app);

// check connection
var connected = true;
pool.connect()
    .catch((err) => {
        console.log("error connecting to db: ", err.stack);
        connected = false;
    })
    .then(() => {
        if (connected) {
            console.log("connected to db");
        }
    });

// close pool on app close
process.on("SIGINT", function () {
    pool.end();
    console.log("shutdown");
    process.exit(0);
});

// start application
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
