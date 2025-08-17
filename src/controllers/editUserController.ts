import { Request,Response } from 'express';
import { getUser,handUpdateUsers } from 'services/users';

const getEditUsers = async (req:Request , res:Response)=>{
  //nhận data từ server
  const {id} = req.params;
  const user =  await getUser(id);
  if (!user) {
    return res.redirect('/users');
  }
  return res.render("pages/editUser",{user: user });
}

const postUpdateUser = async (req:Request , res:Response)=>{
  //nhận data từ server
  const { id, name, email, address } = req.body;
  await handUpdateUsers( id, name, email, address);
  return res.redirect('/users');
}
export {getEditUsers,postUpdateUser }