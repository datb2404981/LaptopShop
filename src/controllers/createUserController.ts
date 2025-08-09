import { Request, Response } from "express";

const getCreateUserPage = (req:Request , res:Response)=>{
  return res.render('pages/createUser.ejs');
}

const postCreateUserPage = (req:Request , res:Response)=>{
  // Với các thuộc tính name đã được thêm vào form, bạn có thể lấy dữ liệu ở đây
  console.log(">>> check req.body: ", req.body);
  return res.redirect("/");
}

export { getCreateUserPage, postCreateUserPage };