import { Router } from "express";
import postController from "../controllers/postController";
import verifyToken from "../middlewares/verifyToken";

const postRoutes = Router();

postRoutes.route("/posts").get(postController.index);

postRoutes.route("/posts/:slug").get(postController.show);

postRoutes.route("/posts").post(verifyToken(), postController.create);

postRoutes.route("/posts/:slug").put(verifyToken(), postController.update);

postRoutes.route("/posts/:slug").delete(verifyToken(), postController.destroy);

export default postRoutes;