import { Request, Response } from "express";
import { getAllProduct } from "services/products";

const getHomePage =  async (req: Request, res: Response) => {
  const products = await getAllProduct();
  return res.render('pages/client/home/show.ejs', { products,layout: 'layouts/clientLayout'});
}

const getLoginPage = async (req: Request, res: Response) => {
  return res.render('pages/client/account/login.ejs', { layout: false });
}

const getSignupPage = async (req: Request, res: Response) => {
  return res.render('pages/client/account/signup.ejs', { layout: false });
}
export{getHomePage,getLoginPage,getSignupPage}