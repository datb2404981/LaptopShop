import express, { Express } from "express";
import { getHomePage } from "controllers/client/user";
import { getCreateUserPage, postCreateUserPage, postDeleteUserPage, } from "controllers/createUserController";
import { getEditUsers,postUpdateUser } from "controllers/admin/adminUser";
import { getUsers } from "controllers/usersController";
import { getAdmin, getUser, getProduct, getOrder } from "controllers/admin/admin";
import multer from "multer";
import fileUploadMiddleware from "middleware/multer";
import { getProductPage } from "controllers/client/clientProduct";
import { getAdminCreateProductPage } from "controllers/admin/adminProduct";

const router = express.Router();
const upload = multer({ dest: 'uploads/' })

const WebRouters = (app : Express) => {

  router.get('/users', getUsers);

  // Admin 
  router.get('/admin/dashboard', getAdmin);
  
  //Admin/user
  router.get('/admin/user', getUser);
  router.get('/admin/create', getCreateUserPage);
  router.post('/admin/create', postCreateUserPage);
  router.post('/admin/create', fileUploadMiddleware('avatar'), postCreateUserPage);
  router.post('/admin/deleteUser/:id', postDeleteUserPage );
  router.get('/admin/editUser/:id', getEditUsers);
  router.post('/admin/updateUser', fileUploadMiddleware('avatar'), postUpdateUser);
  
  //Admin/product
  router.get('/admin/product/create', getAdminCreateProductPage); // Controller does not exist
  router.post('/admin/product/create', fileUploadMiddleware('image', "images/product"), postCreateUserPage); // Wrong controller
  router.get('/admin/product', getProduct);
  
  //Admin/order
  router.get('/admin/order', getOrder);
  
  //Admin
  router.get('/admin', getAdmin);

  // Client 
  router.get('/', getHomePage);

  //Product
  router.get('/product/:id', getProductPage);

  app.use('/', router);

}

export default WebRouters;