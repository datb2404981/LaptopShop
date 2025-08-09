import { Request, Response } from "express";

const getHomePage = (req:Request , res:Response)=>{
  return res.render('pages/home.ejs');
}

export{getHomePage}