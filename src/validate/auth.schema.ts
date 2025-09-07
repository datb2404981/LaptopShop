import { z } from "zod";
import { isEmailExist } from "services/auth";

// Email
const emailSchema = z.string().email("Email không đúng định dạng")
  .refine(async (email) => {
    const existingUser = await isEmailExist(email);
    return !existingUser;
  }, {
    path: ["email"],
    message: "Email already exists"
  });

// Password
const passwordSchema = z.string()
  .min(8, { message: "Password tối thiểu 8 kí tự" })
  .max(20, { message: "Password tối đa 20 kí tự" }); // sửa text cho khớp số

// Auth Schema
export const authSchema = z.object({
  fullname: z.string().trim().min(1, { message: "Tên không được để trống" }),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Mật khẩu không khớp",
});

export type TAuthSchema = z.infer<typeof authSchema>;