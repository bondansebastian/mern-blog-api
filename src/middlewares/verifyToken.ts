import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import abort from "../utils/abort";
import User from "../models/user";

export default function verifyToken()
{
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
};