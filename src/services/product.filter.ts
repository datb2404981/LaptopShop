import { array, lte } from 'zod';
import { prisma } from "config/client"
import Fuse from 'fuse.js';
import { Product } from 'src/generated/prisma';


const pricefilter = async (prices :{ min: number, max: number }[]) => {
  let result;
  //San Pham co gia toi thieu >= 1.000.000d
  // result = await prisma.product.findMany({
  //   where: {
  //     price: { gte: minPrice },
  //   },
  //   orderBy: { price: "desc" },
  // });

  // san pham co gia toi da <= 15.000.000d
  // result = await prisma.product.findMany({
  //   where: {
  //     price: { lte: maxPrice },
  //   },
  //   orderBy: {
  //     price: "desc",
  //   },
  // });

  //san pham trong khoang tien minPrice <= price <= maxPrice
  // let minPrice: number | undefined;
  // let maxPrice: number | undefined;

  // if (price.length >= 2) {
  //   minPrice = price[0] * 1000000;
  //   maxPrice = price[1] * 1000000;

  //   result = await prisma.product.findMany({
  //     where: {
  //       price: {
  //         gte: minPrice,
  //         lte: maxPrice,
  //       },
  //     },
  //   });
  // }


  result = await prisma.product.findMany({
    where: {
      OR: prices.map((r) => ({
        price: { gte: r.min, lte: r.max },
      })),
    }, orderBy: {
      price:"desc"
    }
  });
  console.log("🚀 ~ pricefilter ~ result:", result)
  return result;
}

const getProductWithFilter = async (
  page: number,
  pageSize: number,
  factory: string,
  target: string,
  price: string,
  sort: string,
  search:string,
) => {
  // build whereClause

  let whereClause: any = {};

  if (factory) {
    const factoryInput = Array.isArray(factory) ? factory : factory.split(",");
    whereClause.factory = {
      in: factoryInput,
    };
  }

  //whereClause={
  // factory:{...}
  // }

  if (target) {
    const targetInput = Array.isArray(target) ? target : target.split(",");
    whereClause.target = {
      in: targetInput,
    };
  }
  //whereClause={
  // factory:{...}
  // target:{...}
  // }

  if (price) {
    whereClause.price = {
      lte: +price,
    };
  }

  //whereClause={
  // factory:{...}
  // target:{...}
  // <= price
  // }

  if (search) {
    const keywords = search.split(/\s+|\+/); // tách theo space hoặc dấu +

    whereClause.OR = [
      // match nguyên chuỗi
      { name: { contains: search}},
      { shortDesc: { contains: search}},
      { detailDesc: { contains: search}},
      { factory: { contains: search}},
      { target: { contains: search}},

      // match từng keyword
      ...keywords.flatMap((kw) => [
        { name: { contains: kw}},
        { shortDesc: { contains: kw}},
        { detailDesc: { contains: kw}},
        { factory: { contains: kw}},
        { target: { contains: kw}},
      ]),
    ];
  }


  let sortByClause: any = {};
  if (sort && sort === "asc") {
    sortByClause = {
      price: "asc",
    };
  } else {
    sortByClause = {
      price: "desc",
    };
  }

  let [products, count] = await prisma.$transaction([
    prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: whereClause,
      orderBy: sortByClause,
    }),
    prisma.product.count({ where: whereClause }),
  ]);



  const totalPages = Math.ceil(count / pageSize);
  return { products, totalPages };
};


export { pricefilter, getProductWithFilter };

