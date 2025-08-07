import express, { Express } from "express";
import { getHomePage,getCreateUserPase } from "../controllers/home";

const router = express.Router();

const WebRouters = (app : Express) => {
  
  router.get('/createUser',getCreateUserPase);

  router.get('/', getHomePage);

  app.use('/', router);

}

export default WebRouters;