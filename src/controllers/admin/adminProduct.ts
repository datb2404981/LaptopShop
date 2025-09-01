import { Request, Response } from "express";

const getAdminCreateProductPage = async (req: Request, res: Response) => {

  return res.render('pages/admin/Product/create.ejs', { layout: 'layouts/adminLayout'});
}



export { getAdminCreateProductPage }