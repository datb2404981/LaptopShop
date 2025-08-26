import { Identifier } from './../../node_modules/acorn/dist/acorn.d';
import { Request, Response } from "express";
import { handCreateUsers,handDeleteUsers,getUser } from "services/users";

const getCreateUserPage = (req:Request , res:Response)=>{
  return res.render('pages/createUser.ejs');
}

const postCreateUserPage = async (req:Request , res:Response)=>{

  //nhận data từ server
  const { name, email, address } = req.body;
  await handCreateUsers(name, email, address);
  return res.redirect("/?success=true");
}


const postDeleteUserPage = async (req:Request , res:Response)=>{
  //nhận data từ server
  const id = req.params.id;
  await handDeleteUsers(id);
  return res.redirect("/users?success=true");
}



export { getCreateUserPage, postCreateUserPage, postDeleteUserPage };