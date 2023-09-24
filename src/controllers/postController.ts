import { Request, Response } from "express";
import Post from "../models/post";
import slugify from "../utils/slugify";

export default {
    async index(req: Request, res: Response)
    {
        const limit = req.body.limit;
        const page = req.body.page || 1;

        const resources = await Post.find()
            .sort()
            .skip(limit * (page - 1))
            .limit(page)
            .exec();

        const count = await Post.countDocuments().exec();

        res.json({
            data: resources,
            meta: {
                total: count, 
                currentPage: page,
            }
        });
    },

    async show(req: Request, res: Response) {
        const resource = await Post.findOne({ slug: req.params.slug }).exec();
        res.json({
            data: resource
        });
    },

    async create(req: Request, res: Response) {
        const slug = slugify(req.body.title);
        let resource = new Post({
            title: req.body.title,
            slug,
            description: req.body.description,
        });

        try {
            await resource.save();
            res.json({
                data: resource,
            });
        } catch (error) {
            res.json(error);
        }
    },

    async update(req: Request, res: Response) {
        const resource = await Post.findOne({ slug: req.params.slug }).exec();

        if (resource === null) {
            throw new Error("Resource not found");
        }

        resource.title = req.body.title;
        resource.description = req.body.description;
        
        try {
            await resource.save();
            res.json({
                data: resource,
            });
        } catch (error) {
            res.json(error);
        }
    },

    async destroy(req: Request, res: Response) {
        try {
            await Post.deleteOne({ slug: req.params.slug });
            res.json({
                message: 'Successfully deleted!'
            });
        } catch (error: any) {
            console.error(error);
            res.json({
                message: error.message,
            });
        }
    }
};