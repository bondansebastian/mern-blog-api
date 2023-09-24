import { Schema, model } from "mongoose";

interface PostInterface {
    title: string,
    slug: string,
    description?: string,
};

const postSchema = new Schema<PostInterface>({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false
    },
});

const Post = model('Post', postSchema);

export default Post;