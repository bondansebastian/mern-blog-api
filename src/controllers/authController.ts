import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import abort from "../utils/abort";

export default {
    async login(req: Request, res: Response) {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (user === null) {
            return abort(res, 401, 'Invalid login');
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return abort(res, 401, 'Invalid login');
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET || '', {
            expiresIn: 86400
        });
        res.json({
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
                accessToken: token,
            },
            message: "Login success",
        });
    },
};