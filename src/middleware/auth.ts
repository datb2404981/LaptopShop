import exp from "constants";
import { Request,Response,NextFunction } from "express";

const isLoginUser = async (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) {
    return res.redirect("/")
  } else {
    next();
  }
}

const isLoginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  
  if (user?.role?.name === "ADMIN") {
    next();
  } else {
    return res.render("status/403.ejs",{layout: false});
  }
}

export { isLoginUser,isLoginAdmin}