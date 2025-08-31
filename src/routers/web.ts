import express, { Express } from "express";
import { getHomePage } from "controllers/home";
import { getCreateUserPage, postCreateUserPage, postDeleteUserPage, } from "controllers/createUserController";
import { getEditUsers,postUpdateUser } from "controllers/editUserController";
import { getUsers } from "controllers/usersController";
import { getAdmin, getUser, getProduct, getOrder } from "controllers/admin";
import multer from "multer";
import   fileUploadMiddleware  from "middleware/multer";

const router = express.Router();
const upload = multer({ dest: 'uploads/' })

const WebRouters = (app : Express) => {
  
 

  router.get('/users', getUsers);

  // Admin 
  router.get('/admin', getAdmin);
  router.get('/admin/dashboard', getAdmin);
  router.get('/admin/user', getUser);
  router.get('/admin/create', getCreateUserPage);
  //router.post('/admin/create', postCreateUserPage);
  router.post('/admin/create', fileUploadMiddleware('avatar'), postCreateUserPage);
  router.post('/admin/deleteUser/:id', postDeleteUserPage );
  router.get('/admin/editUser/:id', getEditUsers);
  router.post('/admin/updateUser', fileUploadMiddleware('avatar'), postUpdateUser );

  router.get('/admin/product', getProduct);
  router.get('/admin/order', getOrder);
  
  router.get('/', getHomePage);

  app.use('/', router);

}

export default WebRouters;