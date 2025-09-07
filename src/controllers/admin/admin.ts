import { Request, Response } from 'express';
import { getAllUsers } from 'services/users';
import { getAllProduct } from "services/products";


const getAdmin = async (req: Request, res: Response) => {

  return res.render('pages/admin/Dashboard/show', { layout : 'layouts/adminLayout'});
};

const getUser = async (req: Request, res: Response) => {
  const success = req.query.success === "true";
  const userList = await getAllUsers();
  return res.render('pages/admin/User/show', {
    usersList: userList,
    success: success,
    layout : 'layouts/adminLayout'});
};

const getProduct = async (req: Request, res: Response) => {
  const success = req.query.success === "true";
  const products = await getAllProduct();
  return res.render('pages/admin/Product/show', {
    products : products,
    success: success,
    layout : 'layouts/adminLayout'});
};

const getOrder = async (req: Request, res: Response) => {

  return res.render('pages/admin/Order/show', { layout : 'layouts/adminLayout' });
};

export { getAdmin,getUser,getProduct,getOrder } 