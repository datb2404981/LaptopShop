import express, { Express } from "express";
import { getHomePage,getLoginPage,getSignupPage } from "controllers/client/user";
import { getCreateUserPage, postCreateUserPage, postDeleteUserPage }
  from "controllers/admin/adminCreateUser";
import { getEditUsers,postUpdateUser } from "controllers/admin/adminUser";
import { getAdmin, getUser, getProduct, getOrder } from "controllers/admin/admin";
import multer from "multer";
import fileUploadMiddleware from "middleware/multer";
import { getProductPage } from "controllers/client/clientProduct";
import {
  getAdminCreateProductPage, postAdminCreateProductPage,
  getEditProducts, postUpdateProduct, postDeleteProductPage
} from "controllers/admin/adminProduct";
import { postSignupPage } from "controllers/client/clientAuth";
import passport from "passport";


const router = express.Router();
const upload = multer({ dest: 'uploads/' })

const WebRouters = (app : Express) => {


  // Admin 
  router.get('/admin/dashboard', getAdmin);
  
  //Admin/user
  router.get('/admin/create', getCreateUserPage);
  router.post('/admin/create', fileUploadMiddleware('avatar',"images/client"), postCreateUserPage);
  router.post('/admin/deleteUser/:id', postDeleteUserPage );
  router.get('/admin/editUser/:id', getEditUsers);
  router.post('/admin/updateUser', fileUploadMiddleware('avatar',"images/client"), postUpdateUser);
  router.get('/admin/user', getUser);
  
  //Admin/product
  router.get('/admin/product/create', getAdminCreateProductPage); // Controller does not exist
  router.post('/admin/product/create', fileUploadMiddleware('image', "images/product"), postAdminCreateProductPage); // Wrong controller
  router.get('/admin/product/editProduct/:id', getEditProducts);
  router.post('/admin/product/updateProduct', fileUploadMiddleware('image', "images/product"), postUpdateProduct);
  router.post('/admin/product/deleteProduct/:id', postDeleteProductPage );
  router.get('/admin/product', getProduct);
  
  //Admin/order
  router.get('/admin/order', getOrder);
  
  //Admin
  router.get('/admin', getAdmin);

  // Client 
  router.get('/', getHomePage);
  router.get('/login', getLoginPage);
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
  }));


  router.get('/signup', getSignupPage);
  router.post('/signup', postSignupPage);
  

  //Product
  router.get('/product/:id', getProductPage);

  app.use('/', router);

}

export default WebRouters;