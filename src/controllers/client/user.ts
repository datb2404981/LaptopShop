import { Request, Response } from "express";
import {
  getAllProduct,
  getCartdetail,
  handDeleteProductToCart,
} from "services/products";

const getHomePage =  async (req: Request, res: Response) => {
  const products = await getAllProduct();
  const user = req.user;
  console.log(">>> current user:", user);
  return res.render('pages/client/home/show.ejs', { products,layout: 'layouts/clientLayout', hideFooter : false});
}

const getLoginPage = async (req: Request, res: Response) => {
  const { session } = req as any;
  const messages = session?.messages ?? [];
  return res.render('pages/client/account/login.ejs', { layout: false,messages });
}

const getSignupPage = async (req: Request, res: Response) => {
  return res.render('pages/client/account/signup.ejs', { layout: false });
}

const getCart = async (req: Request, res: Response) => {
  const user = req.user;
  const cartdetail = await getCartdetail(user);

  const totalPriceProduct = await cartdetail
    .map((item) => {return  +item.price * +item.quantity;})
    .reduce((a, b) => a + b, 0);
  
  const totalDiscountProduct = await cartdetail
    .map((item) => {return +item.product.discount * +item.quantity;})
    .reduce((a, b) => a + b, 0);
  
  return res.render("pages/client/home/cart.ejs", {
    cartdetail,
    totalPriceProduct,
    totalDiscountProduct,
    layout: "layouts/clientLayout",
    hideFooter: true,
  });
}


const getCheckout = async (req: Request, res: Response) => {
  const user = req.user;
  const cartdetail = await getCartdetail(user);

  const totalPriceProduct = await cartdetail
    .map((item) => {
      return +item.price * +item.quantity;
    })
    .reduce((a, b) => a + b, 0);

  const totalDiscountProduct = await cartdetail
    .map((item) => {
      return +item.product.discount * +item.quantity;
    })
    .reduce((a, b) => a + b, 0);

  return res.render("pages/client/home/checkout.ejs", {
    cartdetail,
    totalPriceProduct,
    totalDiscountProduct,
    layout: "layouts/clientLayout",
    hideFooter: true,
    user : user
  });
};


export { getHomePage, getLoginPage, getSignupPage, getCart, getCheckout }; 