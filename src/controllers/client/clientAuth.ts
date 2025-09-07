import { Request, Response } from "express";
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

export{postSignupPage}
