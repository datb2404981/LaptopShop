import { Request, Response } from "express";

const getHomePage = (req:Request , res:Response)=>{
  return res.render('pages/home.ejs');
}

const getCreateUserPase = (req:Request , res:Response)=>{
  return res.render('createUser.ejs');
}

export{getHomePage,getCreateUserPase}