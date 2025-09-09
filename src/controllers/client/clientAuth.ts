import { NextFunction, Request, Response } from "express";
import { authSchema, TAuthSchema } from "src/validate/auth.schema";
import { handUserSignUp } from "services/auth";

const postSignupPage = async (req: Request, res: Response) => { 
  const { fullname, email, password } = req.body as TAuthSchema;
  const validate = await authSchema.safeParseAsync(req.body);

  if (!validate.success) {
    const errorZod = validate.error.flatten().fieldErrors;
    return res.render('pages/client/account/signup', {
      layout: false,
      errors: errorZod,
      old: req.body
    });
  }

  await handUserSignUp( fullname, email, password);
  return res.redirect('/');
}

const getSuccessRedirectPage = async (req: Request, res: Response) => {
  const user = req.user as any;
  if (user?.role?.name === "ADMIN") {
    return res.redirect('/admin')
  }
  return res.redirect('/')
}

const postLogOut = async (req: Request, res: Response, next: NextFunction) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}
export{postSignupPage,getSuccessRedirectPage,postLogOut}
