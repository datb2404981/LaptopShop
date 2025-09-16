import { Request, Response } from 'express';
import { getAllUsers } from 'services/users';
import { getAllOrder, getAllOrderDetail, getAllProduct } from "services/products";


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

  const orders = await getAllOrder();
  return res.render('pages/admin/Order/show', { orders,layout : 'layouts/adminLayout' });
};

const getOrderDetail = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const orderDetails = await getAllOrderDetail(+orderId);

  return res.render("pages/admin/Order/orderDetail.ejs", {
    orderDetails,
    layout: "layouts/adminLayout",
  });
};
export { getAdmin, getUser, getProduct, getOrder, getOrderDetail }; 