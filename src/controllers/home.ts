import { Request, Response } from "express";

const getHomePage = (req: Request, res: Response) => {
  const success = req.query.success;
  return res.render('pages/home.ejs',{success : success});
}

export{getHomePage}