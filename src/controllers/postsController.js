import { Router } from "express";
import { isAuth } from '../middlewares/authMiddleware.js';

const postsController = Router();

postsController.get('/create', isAuth, (req, res) => {
    res.render('posts/create');
})

export default postsController;