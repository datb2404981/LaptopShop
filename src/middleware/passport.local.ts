import { handleLogin } from 'services/auth';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUser } from 'services/users';

const configPassportLocal = () => {
  passport.use(new LocalStrategy({
    passReqToCallback: true
  }, function verify(req, username, password, cb) {
    const { session } = req as any;
    if (session?.messages?.length) {
      session.messages = [];
    }
    console.log(`>>> check username: ${username} , password : ${password}`);
    return handleLogin(username, password, cb);
  }));

  passport.serializeUser(function(user:any, cb) {
      cb(null, { id: user.id, username: user.username });
    
  });

  passport.deserializeUser(async function (user:any, cb) {
    const { id, username } = user;
    //query to database
    const userInDB = await getUser(id)
    return cb(null, userInDB);
    
  });
}

export default configPassportLocal;