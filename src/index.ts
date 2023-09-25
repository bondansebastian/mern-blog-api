import './envConfig';
import express from "express";
import cors from "cors";
import dbo from "./db/conn";
// import createAdmin from './middlewares/createAdmin';
import indexRoutes from './routes/indexRoutes';
// import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
// app.use(createAdmin());
app.use(authRoutes);
app.use(indexRoutes);
// app.use(postRoutes);

app.listen(port, () => {
    // Perform a database connection when server starts
    dbo.connectToServer(function (err: any) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});

export default app;