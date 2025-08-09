import express, { Express } from "express";
import { getHomePage } from "../controllers/home";
import { getCreateUserPage,postCreateUserPage } from "../controllers/createUserController";

const router = express.Router();

const WebRouters = (app : Express) => {
  
  router.get('/createUser', getCreateUserPage);
  router.post('/createUser', postCreateUserPage);

  router.get('/', getHomePage);

  app.use('/', router);

}

export default WebRouters;