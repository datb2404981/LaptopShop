import { Request, Response } from "express";

const getProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  return res.render('pages/client/product/showProduct.ejs', { layout: 'layouts/clientLayout'});
}



export { getProductPage }

