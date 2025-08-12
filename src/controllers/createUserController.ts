import { Request, Response } from "express";
import { handCreateUsers } from "../services/users";

const getCreateUserPage = (req:Request , res:Response)=>{
  return res.render('pages/createUser.ejs');
}

const postCreateUserPage = async (req:Request , res:Response)=>{

  //nhận data từ server
  const { name, email, address } = req.body;
  await handCreateUsers(name, email, address);

  return res.redirect("/?success=true");
}



export { getCreateUserPage, postCreateUserPage };