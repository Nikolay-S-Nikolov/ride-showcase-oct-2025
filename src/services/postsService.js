import Car from '../models/Car.js';

export default {
    create(postData, userId) {
        postData.owner = userId;
        return Car.create(postData);
    },

    getAll() {
        return Car.find();
    }
}