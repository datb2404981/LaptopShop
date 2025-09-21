import { prisma } from 'config/client';
import  Prisma  from '@prisma/client';
import { ACCOUNT_TYPE } from 'config/constant';
import bcrypt from "bcrypt";
import passport from 'passport';

const saltRounds = 10;

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
}

const comparPassword = async (plaiText:string, hashPassword:string) => {
  return await bcrypt.compare(plaiText, hashPassword);
}

const handCreateUsers = async(
  name: string,
  email: string,
  address: string,
  password: string,
  phone: string,
  avatar: string,
  role: string
) => {

  const passwordcoding = await hashPassword(password);
  const newUser = await prisma.user.create({
    data: {
      fullname : name,
      username: email,
      address: address,
      password: passwordcoding,
      accountType: ACCOUNT_TYPE.SYSTEM,
      phone: phone,
      avatar: avatar,
      roleId : +role
    },
  })
  return newUser;
}

const getAllUsers = async () => {
  const users = prisma.user.findMany();
  return users;
};

const getAllRole = async () => {
  const role = prisma.role.findMany();
  return role;
};


const getUser = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { id: +id },
  })
  return user;
}

const getRole = async (id: string) => {
  const role = await prisma.role.findFirst({
    where: { id: +id },
  })
  return role;
}


const handDeleteUsers = async (id: string) => {
  const userDelete = await prisma.user.delete({
    where: {
      id: +id,
    },
  });
 return userDelete;
}

const handUpdateUsers = async (id : string, fullname :string, username :string, address :string , avatar: string  , password :string, phone :string ,role :string)=>{
  
  const dataToUpdate: any = {
      fullname : fullname,
      username: username,
      address: address,
      phone: phone,
      avatar: avatar,
  };

  if (password) {
      const passwordcoding = await bcrypt.hash(password, saltRounds);
      dataToUpdate.password = passwordcoding;
  }
  if(role){
    dataToUpdate.roleId = +role
  }

  const userUpdate = await prisma.user.update({
    where: {
      id: +id,
    },
    data: dataToUpdate
  })
  return userUpdate;
}

const handCheckPassword = async (id: string, oldPassword: string) => {
  const user = await getUser(id);
  const isMatch = comparPassword;
  return isMatch;
}

export {
  getAllUsers, getUser, handCreateUsers,
  handDeleteUsers, handUpdateUsers, getAllRole,
  getRole,handCheckPassword,hashPassword,comparPassword
}