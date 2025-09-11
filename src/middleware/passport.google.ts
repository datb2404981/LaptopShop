import  passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import 'dotenv/config'
import { handSignUp_Google } from "services/auth";

const configPassportGoogle = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
    async function (accessToken, refreshToken, profile :any, cb) {
      const { displayName, emails } = profile as any;
      const fullname = displayName;
      const username = emails && emails.length > 0 ? emails[0].value : "";

      const user = await handSignUp_Google(fullname,username);
      return cb(null, user);
  }
));
}

export default configPassportGoogle