import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import jwt from 'jsonwebtoken';
import { AppEnv } from "./env.config";
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/userModel';


passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: AppEnv.JWT_SECRET,
      },
      (payload, done) => {
        UserModel.findById(payload.id, (err: any, user:any) => {
          if (err) return done(err, false);
          if (!user) return done(null, false);
          return done(null, user);
        });
      }
    )
);
  

export const generateJWT = (user: any) => {
    const payload = { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin, canScan: user.canScan, firstName: user.firstName, lastName: user.lastName };
    return jwt.sign(payload, AppEnv.JWT_SECRET);
};

export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const localAuthenticate = async (email: string, password: string) => {
    const user: any = await UserModel.findOne({ email });
    if (!user) return null;


    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    return user;
};