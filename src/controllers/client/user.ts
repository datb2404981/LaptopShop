import { Request, Response } from "express";

const getHomePage = (req: Request, res: Response) => {
  return res.render('pages/client/show.ejs', { layout: 'layouts/clientLayout'});
}

export{getHomePage}