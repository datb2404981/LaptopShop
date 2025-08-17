import express, { Express } from "express";
import { getHomePage } from "controllers/home";
import { getCreateUserPage, postCreateUserPage, postDeleteUserPage, } from "controllers/createUserController";
import { getEditUsers,postUpdateUser } from "controllers/editUserController";
import { getUsers } from "controllers/usersController";

const router = express.Router();

const WebRouters = (app : Express) => {
  
  router.get('/createUser', getCreateUserPage);
  router.post('/createUser', postCreateUserPage);
  router.post('/deleteUser/:id', postDeleteUserPage );
  router.get('/editUser/:id', getEditUsers);
  router.post('/updateUser', postUpdateUser );
  router.get('/users', getUsers);
  
  router.get('/', getHomePage);

  app.use('/', router);

}

export default WebRouters;