import { Schema, model } from "mongoose";

interface UserInterface {
    name: string,
    email: string,
    password: string,
};

const userSchema = new Schema<UserInterface>({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "email not provided"],
        validate: {
            validator: function (v:any) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true
    },
});

const User = model('User', userSchema);

export default User;