import './envConfig';
import express, { Router } from "express";
import cors from "cors";
import mongoose from 'mongoose';
import authController from './controllers/authController';
import postController from './controllers/postController';
import middlewares from './middlewares';

const app = express();
const port = process.env.PORT || 5000;
const routes = Router();

routes
    .get('/', (req, res) => {
        res.json('Hi!');
    })
    .post('/login', authController.login)
    .get("/posts", postController.index)
    .get("/posts/:slug", postController.show)
    .post("/posts", middlewares.verifyToken(), postController.create)
    .put("/posts/:slug", middlewares.verifyToken(), postController.update)
    .delete("/posts/:slug", middlewares.verifyToken(), postController.destroy);;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(middlewares.createAdmin());
app.use(routes);

app.listen(port, () => {
    // Perform a database connection when server starts
    connectToServer(function (err: any) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});

export default app;

function connectToServer(callback: any) {
    let uri = process.env.ATLAS_URI;
    const password = process.env.ATLAS_PASSWORD;

    if (uri === undefined) {
        throw new Error("Undefined Atlas URI");
    }
    
    if (password === undefined) {
        throw new Error("Undefined Atlas password");
    }
    
    uri = uri.replace('<password>', encodeURIComponent(password));

    mongoose.connect(uri)
        .then(() => {
            console.log("Successfully connected to MongoDB."); 
        })
        .catch(error => {
            callback(error);
        });
}