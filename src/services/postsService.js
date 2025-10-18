import Car from '../models/Car.js';

export default {
    create(postData, userId) {
        postData.owner = userId;
        return Car.create(postData);
    },

    getAll() {
        return Car.find();
    },

    getOne(postId) {
        return Car.findById(postId).populate('owner').populate('likes');
    },

    async like(userId, postId) {
        const post = await Car.findById(postId);
        if (!post) {
            throw new Error('No such post');
        }

        if (post.owner.equals(userId)) {
            throw new Error('Creators can not like their posts');
        }

        if (post.likes.some(id => id.equals(userId))) {
            throw new Error('You have already liked this post');
        }

        post.likes.push(userId);
        await post.save();
        return post;
    },

    edit(postId, postData) {
        const opt = { runValidators: true }
        const updatedPost = Car.findByIdAndUpdate(postId, postData, opt);
        return updatedPost;
    },

    delete(postId){
        return Car.findByIdAndDelete(postId);
    },

}