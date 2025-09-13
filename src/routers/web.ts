import express, { Express } from "express";
import { getCart, getHomePage,getLoginPage,getSignupPage } from "controllers/client/user";
import { getCreateUserPage, postCreateUserPage, postDeleteUserPage }
  from "controllers/admin/adminCreateUser";
import { getEditUsers,postUpdateUser } from "controllers/admin/adminUser";
import { getAdmin, getUser, getProduct, getOrder } from "controllers/admin/admin";
import multer from "multer";
import fileUploadMiddleware from "middleware/multer";
import { getProductPage, postAddCart, postDeleteProductToCart } from "controllers/client/clientProduct";
import {
  getAdminCreateProductPage, postAdminCreateProductPage,
  getEditProducts, postUpdateProduct, postDeleteProductPage
} from "controllers/admin/adminProduct";
import { getSuccessRedirectPage, postLogOut, postSignupPage } from "controllers/client/clientAuth";
import passport from "passport";
import { isLoginAdmin, isLoginUser } from "middleware/auth";


const clientRouter = express.Router();
const adminRouter = express.Router();
const upload = multer({ dest: 'uploads/' })

const WebRouters = (app : Express) => {

  // ================= ADMIN ROUTES =================
  //Admin/dashboard
  adminRouter.get('/dashboard', getAdmin);
  //Admin/user
  adminRouter.get('/create', getCreateUserPage);
  adminRouter.post('/create', fileUploadMiddleware('avatar',"images/client"), postCreateUserPage);
  adminRouter.post('/deleteUser/:id', postDeleteUserPage );
  adminRouter.get('/editUser/:id', getEditUsers);
  adminRouter.post('/updateUser', fileUploadMiddleware('avatar',"images/client"), postUpdateUser);
  adminRouter.get('/user', getUser);
  
  //Admin/product
  adminRouter.get('/product/create', getAdminCreateProductPage); // Controller does not exist
  adminRouter.post('/product/create', fileUploadMiddleware('image', "images/product"), postAdminCreateProductPage); // Wrong controller
  adminRouter.get('/product/editProduct/:id', getEditProducts);
  adminRouter.post('/product/updateProduct', fileUploadMiddleware('image', "images/product"), postUpdateProduct);
  adminRouter.post('/product/deleteProduct/:id', postDeleteProductPage );
  adminRouter.get('/product', getProduct);
  
  //Admin/order
  adminRouter.get('/order', getOrder);
  
  //Admin/
  adminRouter.get('/', getAdmin);

  //================= CLIENT ROUTES =================
  
  //Auth
  clientRouter.get('/successRedirect', getSuccessRedirectPage)
  //login system
  clientRouter.get('/login', isLoginUser, getLoginPage);
  clientRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/successRedirect',
    failureRedirect: '/login',
    failureMessage: true
  }));
  clientRouter.post('/logout', postLogOut);
  //login google
  clientRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));
  clientRouter.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
    });
  //sign up
  clientRouter.get('/signup',isLoginUser, getSignupPage);
  clientRouter.post('/signup', postSignupPage);

  //cart
  clientRouter.get('/cart', getCart);
  clientRouter.post("/cart/deleteProduct", postDeleteProductToCart);

  //Product
  clientRouter.post('/appProductToCart', postAddCart);
  clientRouter.get('/product/:id', getProductPage);

  //Home
  clientRouter.get('/', getHomePage);
  app.use('/admin',isLoginAdmin, adminRouter);
  app.use('/', clientRouter);

}

export default WebRouters;