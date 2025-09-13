import { getUserWithRole, getUserWithSumCart, handleLogin } from 'services/auth';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

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
    process.nextTick(function() {
      cb(null, user.id);
    });
  });

  passport.deserializeUser(async function (id: number, cb) {
    process.nextTick(async function() {
      const userInDB: any = await getUserWithRole(id);
      const sumCart = await getUserWithSumCart(id);
      return cb(null,{ ...userInDB,sumCart});
    });
  });
}

export default configPassportLocal;