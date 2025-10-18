import { Router } from "express";
import { isAuth } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/errorUtils.js'
import postsService from "../services/postsService.js";

const postsController = Router();

postsController.get('/create', isAuth, (req, res) => {
    res.render('posts/create');
})

postsController.post('/create', isAuth, async (req, res) => {
    const postData = req.body;
    const userId = req.user.id;

    try {
        await postsService.create(postData, userId);
        res.render('posts/all');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('posts/create', { error: errorMessage, post: postData });
    }
})

export default postsController;