import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/user";
import abort from "./utils/abort";

export default {
    createAdmin() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const email = process.env.ADMIN_EMAIL;
            const name = process.env.ADMIN_NAME;
            const password = process.env.ADMIN_PASSWORD;

            let user = await User.findOne({ email }).exec();

            if (user !== null) {
                console.log("User found!");
                next();
                return;
            }

            console.log("User not found, creating admin user...");

            if (password === undefined) {
                throw new Error("Admin password must be set");
            }

            user = new User({
                name,
                email,
                password: bcrypt.hashSync(password, 8),
            });

            await user.save();
            console.log(`User ${email} created!`);
            next();
        }
    },

    verifyToken() {
        return (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;
    
            if (token === undefined || token.split(' ')[0] !== 'JWT') {
                return abort(res, 401, 'Unauthenticated');
            }
    
            jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || '', async (err, decode) => {
                if (err || decode === undefined || typeof decode === 'string') return abort(res, 401, 'Unauthenticated');
                const user = await User.findOne({ _id: decode.id }).exec();
                if (user === null) return abort(res, 401, 'Unauthenticated');
            });
    
            next();
        };
    }
}