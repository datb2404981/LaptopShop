import { prisma } from 'config/client';
import { Product } from './../generated/prisma/index.d';

const getAllProduct = async () => {
  const products = await prisma.product.findMany();
  return products;
}

const getProduct = async (id: string) => {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });
  return product;
}

const handCreateProduct = async (
  name: string,
  shortDesc: string,
  detailDesc: string,
  image: string,
  factory: string,
  target: string,
  quantity: number,
  price: number,
  discount: number
) => {
  const newProduct = await prisma.product.create({
    data: {
      name, shortDesc, detailDesc,
      image, factory, target,
      quantity: +quantity, price: +price, discount: +discount
    }
  })
  
  return newProduct;
}

const handUpdateProduct = async (
  id: string,
  name: string,
  shortDesc: string,
  detailDesc: string,
  image: string,
  factory: string,
  target: string,
  quantity: number,
  price: number,
  discount: number
) => {
  const dataToUpdate: any = {
    name,
    shortDesc,
    detailDesc,
    image,
    factory,
    target,
    quantity: +quantity, // Convert to number
    price: +price,       // Convert to number
    discount: +discount   // Convert to number
  };

  const updateProduct = await prisma.product.update({
    where: { id: Number(id) },
    data: dataToUpdate
  });

  return updateProduct;
};

const handDeleteProduct = async (id: string) => {
  const deleteProduct =  await prisma.product.delete({
    where:{id : +id}
  })
  return deleteProduct;
};

export { getAllProduct, handCreateProduct, getProduct,handUpdateProduct, handDeleteProduct }