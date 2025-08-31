import { Identifier } from './../../node_modules/acorn/dist/acorn.d';
import { Request, Response } from "express";
import { handCreateUsers,handDeleteUsers,getUser, getAllRole } from "services/users";


const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRole();
  return res.render('pages/admin/User/create.ejs',{ roles });
}

const postCreateUserPage = async (req:Request , res:Response)=>{
  const file = req.file;
  const avatar = file ? file.filename : "";
  //nhận data từ server
  const { fullname, username, address ,password, phone, role } = req.body;
  await handCreateUsers(fullname, username, address,password,phone, avatar, role);
  return res.redirect("/?success=true");
}


const postDeleteUserPage = async (req:Request , res:Response)=>{
  //nhận data từ server
  const { id } = req.params;
  await handDeleteUsers(id);
  return res.redirect("/admin/user?success=true");
}



export { getCreateUserPage, postCreateUserPage, postDeleteUserPage };