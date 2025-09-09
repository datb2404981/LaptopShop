import { prisma } from 'config/client';
import { ACCOUNT_TYPE } from 'config/constant';
import { comparPassword, hashPassword } from "services/users";

const isEmailExist = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { username: email }
  });
  return !!user;
}


const handUserSignUp = async (fullname: string, email: string, password: string) => {
  const passwordcoding = await hashPassword(password);
  const userRole = await prisma.role.findFirst({
    where: { name: "USER" }
  });

  if (!userRole) {
    throw new Error("Role 'USER' not found. Please seed the database.");
  }

  const newUserSignUp = await prisma.user.create({
    data: {
      fullname: fullname,
      username: email,
      password: passwordcoding,
      address: null,
      phone: null,
      avatar: null,
      accountType: ACCOUNT_TYPE.SYSTEM,
      role: {
        connect: {
          id: userRole.id
        }
      }
    }
  });

  return newUserSignUp;
}

const handleLogin = async (username : string, password:string, cb: any) => {
  //connect user
  const user = await prisma.user.findUnique({
    where:{username},
  })
  if (!user) {
    return cb(null, false, { message: "Incorrect username or password" });
  }

  //check password
  const isMatch = await comparPassword(password, user.password);
  if (!isMatch) {
    return cb(null, false, { message: "Incorrect username or password" });
  }

  return cb(null, user);
}

const getUserWithRole  = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { id: +id },
    include: { role: true },
    omit: {
      password:true
    }
  })
  return user;
}


export { isEmailExist, handUserSignUp,handleLogin,getUserWithRole }