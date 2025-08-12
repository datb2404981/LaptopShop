import express from "express";
import 'dotenv/config'
import WebRouters from "./routers/web";
import path from "path";
import expressLayouts from 'express-ejs-layouts';
import mysql from 'mysql2/promise';
import { get } from "https";
import { getConnection } from "./config/database";

const app = express();
const port = process.env.PORT;

getConnection();

//config view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//config layout view
app.use(expressLayouts);
app.set('layout', 'layout/main');


//config req.body to parse form data
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// DEBUG: Log all incoming requests (thể hiện debug trên server)
app.use((req, res, next) => {
  console.log(`[DEBUG] Request received: ${req.method} ${req.originalUrl}`);
  next(); // Important: pass control to the next handler
});

//config routers
WebRouters(app);


//config static files: images/css/js
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`My server is http://localhost:${port}`);
});