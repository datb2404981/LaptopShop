import { handleLogin } from 'services/auth';
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
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
      return cb(null, user);
    });
  });
}

export default configPassportLocal;