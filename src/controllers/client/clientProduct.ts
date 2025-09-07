import { Request, Response } from "express";
import { getProduct } from "services/products";
import { targetOptions,factoryOptions } from "config/constant";

const getProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getProduct(id);
  return res.render('pages/client/product/showProduct.ejs', { product,targetOptions,factoryOptions, layout: 'layouts/clientLayout'});
}

export {getProductPage}