import { Request, Response } from "express";
import { productSchema, TProductSchema } from "src/validate/product.schema";
import {
  getAllProduct, handCreateProduct,
  getProduct, handUpdateProduct,handDeleteProduct
} from "services/products";
import { factoryOptions,targetOptions } from 'config/constant';

const getAdminCreateProductPage = async (req: Request, res: Response) => {
  return res.render('pages/admin/Product/create.ejs', { layout: 'layouts/adminLayout'});
}


const postAdminCreateProductPage = async (req: Request, res: Response) => {
  const { name,shortDesc,detailDesc,factory,target,quantity,price,discount } = req.body as TProductSchema;
  const validate = productSchema.safeParse(req.body);

  if (!validate.success) {
    const errorZod = validate.error.flatten().fieldErrors;
    return res.render('pages/admin/Product/create.ejs', {
      layout: 'layouts/adminLayout',
      errors: errorZod,
      old: req.body
    });
  }

  const file = req.file;
  const image = file ? file.filename : "";
  //nhận data từ server
  await handCreateProduct(name, shortDesc, detailDesc, image, factory, target, quantity, price, discount);
  return res.redirect('/admin/product');
}

const getEditProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getProduct(id);
  return res.render('pages/admin/Product/edit.ejs', {
    product,
    factoryOptions,
    targetOptions,
    layout: 'layouts/adminLayout'
  });
}

const postUpdateProduct = async (req: Request, res: Response) => {
  const { id, name, shortDesc, detailDesc, factory, target, quantity, price, discount } = req.body;

  // 1. Lấy thông tin sản phẩm hiện tại
  const existingProduct = await getProduct(id);
  if (!existingProduct) {
    return res.status(404).send("Product not found");
  }

  // 2. Xác định tên file ảnh
  const file = req.file;
  const image = file ? file.filename : existingProduct.image; // Dùng file.filename và giữ ảnh cũ nếu không có file mới

  // 3. Cập nhật sản phẩm
  await handUpdateProduct(id, name, shortDesc, detailDesc, image, factory, target, quantity, price, discount);
  
  return res.redirect('/admin/product');
}

const postDeleteProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  await handDeleteProduct(id);
  return res.redirect('/admin/product?success=true');
}

export {
  getAdminCreateProductPage, postAdminCreateProductPage,
  getEditProducts, postUpdateProduct,postDeleteProductPage
}