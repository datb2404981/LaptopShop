import { Request,Response } from 'express';
import { getUser,handUpdateUsers,getRole,getAllRole } from 'services/users';
import bcrypt from "bcrypt";

const getEditUsers = async (req: Request, res: Response) => {
  const {id} = req.params;
  const user = await getUser(id);
  if (!user) {
    return res.redirect('/admin/user');
  }
  const roles = await getAllRole();
  return res.render("pages/admin/User/detail.ejs", {
    user: user,
    roles,
    layout: 'layouts/adminLayout'
  });
}

const postUpdateUser = async (req:Request , res:Response)=>{
  //nhận data từ server
  const { id, fullname, username, address , oldPassword , newPassword, phone ,role } = req.body;
  const user = await getUser(id);
  if(!user) {
    return res.redirect('/admin/user');
  }
  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);


  if (isPasswordMatch === false) {
    const roles = await getAllRole();
    return res.render("pages/admin/User/detail.ejs", {
      user, roles, check_password: isPasswordMatch // Biến này sẽ là true, false, hoặc null
      ,layout: 'layouts/adminLayout'
  });
  } else {
    const file = req.file;
    const avatar = file ? file.filename : user.avatar;
    await handUpdateUsers(id , fullname , username , address  , avatar  , newPassword , phone ,role);
    return res.redirect('/admin/user');
  }
  
}

export {getEditUsers,postUpdateUser }