import { User } from './../generated/prisma/index.d';
import { getConnection } from "config/database";
import { prisma } from 'config/client';

const handCreateUsers = async(
  name: string,
  email: string,
  address : string,
) => {

  const newUser = prisma.user.create({
    data: {
      name: name,
      email: email,
      address: address,
    },
  })
  return newUser;
}

const getAllUsers = async () => {
  const users = prisma.user.findMany();
  return users;
};

const getUser = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { id: +id },
  })
  return user;
}

const handDeleteUsers = async (id: string)=>{
  const userDelete = await prisma.user.delete({
    where: {
      id: +id,
    },
  })
  return userDelete;
}

const handUpdateUsers = async (id : string, name :string, email:string, address:string )=>{
  const userUpdate = await prisma.user.update({
    where: {
      id: +id,
    },
    data: {
      name: name,
      email: email,
      address: address,
    }
  })
  return userUpdate;
}

export { getAllUsers,getUser, handCreateUsers,handDeleteUsers,handUpdateUsers }