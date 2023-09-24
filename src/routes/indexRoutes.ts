import { Router } from "express";

const indexRoutes = Router();

indexRoutes.get('/', (req, res) => {
    res.json('Hi!');
});

export default indexRoutes;