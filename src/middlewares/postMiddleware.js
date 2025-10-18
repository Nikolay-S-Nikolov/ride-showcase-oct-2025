import postsService from "../services/postsService.js";

export async function isCreator(req, res, next) {
        const postId = req.params.postId;
    try {
        const post = await postsService.getOne(postId);

        if (!post.owner?.equals(req.user.id)) {
            return res.status(401).render('404', { error: 'Only creator can do this action!'});
        }
        
        next();

    } catch (err) {
        return res.status(401).render('404', { error: 'No such post!' });
    }
}