import { prisma } from 'config/client';
import { Product, User } from '@prisma/client';
import { includes } from 'zod';
import { error } from 'console';

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

const getAllOrder = async () => {
  const Orders = await prisma.order.findMany({ include: { user: true } });
  return Orders;
};

const getAllOrderOfUser = async (user: any) => {
  const Orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      orderdetail: {
        include: {
          products: true, // lấy luôn thông tin sản phẩm
        },
      },
    },
  });
  return Orders;
};
const getAllOrderDetail = async (orderId: number) => {
  const OrderDetails = await prisma.orderDetail.findMany({
    where: { orderId },
    include: { orders : true,products: true }
  });
  return OrderDetails;
};

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

const updateCartDetailBeforeCheckout = async (
  data: { id: string, quantity: string; }[], user: any
) => {
  const cart = await getCart(user);
  
  for (let i = 0; i < data.length; i++){
    const currentCartDetail = await prisma.cartDetail.findFirst({
      where: {
        cartId: cart.id,
        productId: +data[i].id,
      },
    });
    await prisma.cartDetail.update({
      where: { id: currentCartDetail.id },
      data: {
        quantity: +data[i].quantity,
      },
    });
  }
};

const handlerPlaceOrder = async (
  user: any,
  receiverName: string,
  receiverAddress: string,
  receiverPhone: string,
  totalPrice: number
) => {
  try {
    await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findFirst({
        where: { userId: user.id },
        include: {
          cartDetails: true,
        },
      });

      if (cart) {
        //create order
        const dataOrderDetail = cart?.cartDetails?.map((item) => ({
          price: item.price,
          quantity: item.quantity,
          productId: item.productId,
        }));

        await tx.order.create({
          data: {
            totalPrice,
            receiverAddress,
            receiverName,
            receiverPhone,
            status: "PENDENG",
            paymentMethod: "COD",
            paymentStatus: "PAYMENT_UNPAID",
            userId: user.id,
            orderdetail: {
              create: dataOrderDetail,
            },
          },
        });

        for (let i = 0; i < cart.cartDetails.length; i++) {
          const productId = cart.cartDetails[i].productId;
          const product = await tx.product.findUnique({
            where: { id: productId },
          });

          if (!product || product.quantity < cart.cartDetails[i].quantity) {
            throw new Error(
              `>>>> Error: San pham ${product.name} khong ton tai hoac khong du so luong`
            );
          } else {
            //giảm quantity Product
            await tx.product.update({
              where: { id: productId },
              data: {
                quantity: { decrement: product.quantity },
                sold: { increment: cart.cartDetails[i].quantity },
              },
            });
          }
        }

        //delete cartDetail
        await tx.cartDetail.deleteMany({
          where: { cartId: cart.id },
        });

        //delete cart
        await tx.cart.delete({
          where: { id: cart.id },
        });
      }
    });
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }

  return {
    success: true
  }
};

export {
  getAllProduct,
  handCreateProduct,
  getProduct,
  getAllOrder,
  getAllOrderDetail,
  getAllOrderOfUser,
  handUpdateProduct,
  handDeleteProduct,
  addProductToCard,
  getCartdetail,
  handDeleteProductToCart,
  updateCartDetailBeforeCheckout,
  handlerPlaceOrder,
}; 