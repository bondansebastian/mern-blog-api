import { Response } from "express";

export default function abort(response: Response, status: number, message?: string)
{
    let command = response.status(403);

    if (message !== undefined) {
        command = command.send({
            message
        });
    }

    return command;
}