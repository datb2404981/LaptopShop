import { Request, Response } from "express";
import { addProductToCard, getProduct, handDeleteProductToCart } from "services/products";
import { targetOptions,factoryOptions } from "config/constant";

const getProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getProduct(id);
  return res.render('pages/client/product/showProduct.ejs', { product,targetOptions,factoryOptions, layout: 'layouts/clientLayout'});
}

const postAddCart = async (req: Request, res: Response) => {
  const { productId,quantity } = req.body;
  const user = req.user;
  if (user) {
    await addProductToCard(+productId, + quantity, user);
    return res.redirect("/")
  } else {
    return res.redirect("/login")
  }
}

const postDeleteProductToCart = async (req: Request, res: Response) => {
  const user = req.user;
  const { productId } = req.body;
  await handDeleteProductToCart(+productId, user);
  return res.redirect("/cart");
};

export { getProductPage, postAddCart, postDeleteProductToCart };