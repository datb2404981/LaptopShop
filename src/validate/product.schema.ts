import { z } from "zod";

export const productSchema = z.object({ 
  name: z.string().trim().min(1,{message: "Tên không được để trống"}),
  price: z.string().transform((val) => (val === "" ? 0 : Number(val)))
    .refine((num) => num > 1000, { message: "Giá tiền tối thiểu là 1.000" }),
  discount: z.string().transform((val) => (val === "" ? 0 : Number(val))).optional(),
  detailDesc: z.string().trim().min(1,{message: "Description không được để trống"}),
  shortDesc: z.string().trim().min(1, { message: "Image không được để trống" }),
  quantity: z.string().transform((val) => (val === "" ? 0 : Number(val)))
  .refine((num) => num > 0 ,{ message: "Giá tiền tối thiểu là 1.000" }),
  factory: z.string().trim().min(1, { message: "Tên nhãn hàng không được để trống" }),
  target: z.string().trim().min(1,{message: "Target không được để trống"}),

});

export type TProductSchema = z.infer<typeof productSchema>;