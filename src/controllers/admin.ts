import { Request, Response } from 'express';
import { getAllUsers } from 'services/users';


const getAdmin = async (req: Request, res: Response) => {

  return res.render('pages/admin/Dashboard/show', { page_type: 'admin' });
};

const getUser = async (req: Request, res: Response) => {
  const success = req.query.success === "true";
  const userList = await getAllUsers();
  return res.render('pages/admin/User/show', {
    usersList: userList,
    success: success,
    page_type: 'admin'});
};

const getProduct = async (req: Request, res: Response) => {

  return res.render('pages/admin/Product/show', { page_type: 'admin' });
};

const getOrder = async (req: Request, res: Response) => {

  return res.render('pages/admin/Order/show', { page_type: 'admin' });
};

export { getAdmin,getUser,getProduct,getOrder } 