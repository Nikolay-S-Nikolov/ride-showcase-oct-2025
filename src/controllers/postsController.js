import { Router } from "express";
import { isAuth } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/errorUtils.js'
import postsService from "../services/postsService.js";
import { isCreator } from '../middlewares/postMiddleware.js'

const postsController = Router();

postsController.get('/create', isAuth, (req, res) => {
    res.render('posts/create');
})

postsController.post('/create', isAuth, async (req, res) => {
    const postData = req.body;
    const userId = req.user.id;

    try {
        await postsService.create(postData, userId);
        res.redirect('/posts/all');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('posts/create', { error: errorMessage, post: postData });
    }
})

postsController.get('/all', async (req, res) => {
    const posts = await postsService.getAll();
    res.render('posts/all-posts', { posts });
})

postsController.get('/:postId/details', async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await postsService.getOne(postId);
        const isCreator = post.owner.id == req.user?.id;
        const isLiked = post.likes.some(u => u.equals(req.user?.id));
        const totalLikes = post.likes.length;
        const likesList = post.likes.map(u => u.email).join(', ');
        res.render('posts/details', { post, isCreator, isLiked, totalLikes, likesList });
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }
})

postsController.get('/:postId/like', isAuth, async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.postId;
    try {
        await postsService.like(userId, postId);
        res.redirect(`/posts/${postId}/details`);
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }

})

postsController.get('/:postId/edit', isAuth, isCreator, async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await postsService.getOne(postId);
        res.render('posts/edit', { post });
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }

})

postsController.post('/:postId/edit', isAuth, isCreator, async (req, res) => {
    const postId = req.params.postId;
    const postData = req.body;
    try {
        await postsService.edit(postId, postData);
        res.redirect(`/posts/${postId}/details`);
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('posts/edit', { post: postData, error: errorMessage });
    }

})

postsController.get('/:postId/delete', isAuth, isCreator, async (req, res) => {
    const postId = req.params.postId;
    try {
        await postsService.delete(postId);
        res.redirect('/posts/all');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage });
    }
})

export default postsController;