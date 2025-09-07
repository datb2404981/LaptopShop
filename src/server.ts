import express from "express";
import 'dotenv/config'
import WebRouters from "./routers/web";
import * as path from "path";
import expressLayouts from 'express-ejs-layouts';
import mysql from 'mysql2/promise';
import initDatabase from "config/seed";
import passport from "passport";
import { getConnection } from "config/database";
import configPassportLocal from "middleware/passport.local";
import session from "express-session";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import  { PrismaClient }  from '@prisma/client';

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
  
//config static files: images/css/js
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//config session
app.use(session({
  cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
  secret: 'a santa at nasa',
    //forces session save even if unchanged
  resave: false,
    
  //save unmodified sessions
    saveUninitialized: false,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        //Clears expired session every 1 day
        checkPeriod: 1 * 24 * 60 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
}));


//config passport 
app.use(passport.initialize());
app.use(passport.authenticate('session'));
configPassportLocal();

//config global
app.use((req, res, next) => {
  res.locals.user = req.user || null; // Pass user object to all views
  next();

});

//config routers 
WebRouters(app);
  
//seeding data
//initDatabase();

app.listen(port, () => {
  console.log(`My server is http://localhost:${port}`);
});  