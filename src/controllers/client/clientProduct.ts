import { Request, Response } from "express";
import { addProductToCard, getAllOrderOfUser, getProduct, handDeleteProductToCart, handlerPlaceOrder, updateCartDetailBeforeCheckout } from "services/products";
import { targetOptions,factoryOptions } from "config/constant";

const getProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getProduct(id);
  return res.render('pages/client/product/showProduct.ejs', { product,targetOptions,factoryOptions, layout: 'layouts/clientLayout', hideFooter: false});
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

const postHandleCartToCheckOut = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.redirect('/');

  const currentCartDetail: { id: string; quantity: string }[] =
    req.body?.cartDetails ?? [];
  await updateCartDetailBeforeCheckout(currentCartDetail,user);
  return res.redirect("/checkout");
}

const postCheckout = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.redirect('/');
  const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body;
  
  const result = await handlerPlaceOrder(
    user,
    receiverName,
    receiverAddress,
    receiverPhone,
    +totalPrice
  );

  if (!result.success) {
    console.log(result.message);
    res.redirect("/cart");
  } else {
    return res.render("pages/client/home/thanks.ejs", {
    layout: "layouts/clientLayout",
    hideFooter: true,
  });
  }
  
}

const getMyOrder = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.redirect("/");
  const orders = await getAllOrderOfUser(user);
  return res.render("pages/client/home/myOrder.ejs", {
    layout: "layouts/clientLayout",orders, hideFooter: true
  });

}

const getAllProductPage = async (req: Request, res: Response) => {
  return res.render("pages/client/product/allProducts.ejs", {
    layout: "layouts/clientLayout",
    hideFooter: false,
  });
}

export {
  getProductPage,
  postAddCart,
  postDeleteProductToCart,
  postHandleCartToCheckOut,
  postCheckout,
  getMyOrder,
  getAllProductPage,
};