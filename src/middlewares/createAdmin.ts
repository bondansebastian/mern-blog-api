import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

export default function createAdmin() {
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
    };
}