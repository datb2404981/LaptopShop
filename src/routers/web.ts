import express, { Express } from "express";

const router = express.Router();

const WebRouters = (app : Express) => {
  
  router.get('/', (req, res)=>{
    res.send("Hello World")
  })

  router.get('/home', (req, res) => {
    res.render('home');
  });
  
  app.use('/', router);

}

export default WebRouters;