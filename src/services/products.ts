import { prisma } from 'config/client';
import { Product, User } from '@prisma/client';

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

const getCart = async (user: any) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });
  return cart;
}

const addProductToCard = async (
  productId: number, quantity: number, user:any) => {
  const cart = await getCart(user);

  const product = await prisma.product.findUnique({
    where:{id: productId}
  })
  
  if (cart) {
    //update
    // cập nhật sum giỏ hàng
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        sumProduct : {
          increment: quantity,
        }
      }
    })

    //cập nhật cartdetail
    //nếu chưa có, tọa mới. có rồi, cập nhật quantity
    const currentCartDetail = await prisma.cartDetail.findFirst({
      where: {
        productId: productId,
        cartId: cart.id
      }
    })

    await prisma.cartDetail.upsert({
    where: {
        id: currentCartDetail?.id ?? 0
      },
      //true
    update: {
      quantity: {
        increment: quantity,
      },
      price: {
        increment: product.price
      }
    },
    create: {
      productId,
      price: product.price,
      quantity,
      cartId: cart.id
    },
  })

  } else {
    //create (cart + cartdetail)
    await prisma.cart.create({
      data: {
        userId: user.id,
        sumProduct: quantity,
        cartDetails: {
          create: [
            {
              price: product.price,
              quantity: quantity,
              productId
            }
          ]
        }
      }
    })
  }
}

const getCartdetail = async (user: any) => {
  
  let cart = await getCart(user);

  if (!cart) {
    cart  = await prisma.cart.create({
      data: {
        userId: user.id,
        sumProduct: 0,
      },
    });
  }
  
  const currentCartDetail = await prisma.cartDetail.findMany({
      where: {
        cartId: cart.id
    },
    include: {
      product:true
    }
  })
  
  return currentCartDetail;
}

const handDeleteProductToCart = async (productId: number, user : any) => {
  const cart = await getCart(user);
  const currentCartDetail = await prisma.cartDetail.findFirst({
    where: {
      productId : productId,
      cartId: cart.id,
    },
  });

  await prisma.cartDetail.delete({
    where: { id: currentCartDetail.id },
  });

  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      sumProduct: { decrement: currentCartDetail.quantity },
    },
  });
};

export {
  getAllProduct,
  handCreateProduct,
  getProduct,
  handUpdateProduct,
  handDeleteProduct,
  addProductToCard,
  getCartdetail,
  handDeleteProductToCart,
}; 