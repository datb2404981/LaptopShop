import { Request,Response } from 'express';
import { getUser,handUpdateUsers,getRole,getAllRole,handCheckPassword } from 'services/users';

const getEditUsers = async (req: Request, res: Response) => {
  const {id} = req.params;
  const user = await getUser(id);
  if (!user) {
    return res.redirect('/admin/user');
  }
  const roles = await getAllRole();
  return res.render("pages/admin/User/detail.ejs", {
    user: user,
    roles
  });
}

const postUpdateUser = async (req:Request , res:Response)=>{
  //nhận data từ server
  const { id, fullname, username, address , oldPassword , newPassword, phone ,role } = req.body;
  let isPasswordMatch = await handCheckPassword(id, oldPassword);


  if (isPasswordMatch === false) {
    const user = await getUser(id);
    const roles = await getAllRole();
    return res.render("pages/admin/User/detail.ejs", {
    user,roles,check_password: isPasswordMatch // Biến này sẽ là true, false, hoặc null
  });
  } else {
    const file = req.file;
    const avatar = file ? file.filename : "";
    await handUpdateUsers( id, fullname, username, address , avatar , newPassword, phone ,role } = req.body;
  let isPasswordMatch = await handCheckPassword(id, oldPassword);
);
    return res.redirect('/users');
  }
  
}
export {getEditUsers,postUpdateUser }