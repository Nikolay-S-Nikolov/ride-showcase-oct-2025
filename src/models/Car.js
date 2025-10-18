import { Schema, model } from "mongoose";

const carSchema = new Schema({
    model: {
        type: String,
        required: [true, 'Model field is required'],
        minLength: [2, 'The model should be at least 2 characters.'],
    },
    manufacturer: {
        type: String,
        required: [true, 'Manufacturer field is required'],
        minLength: [3, 'The manufacturer should be at least 3 characters.'],
    },
    engine: {
        type: String,
        required: [true, 'Engine field is required'],
        minLength: [3, 'The engine should be at least 3 characters.'],
    },
    topSpeed: {
        type: Number,
        required: [true, 'Top speed field is required'],
        min: [10, 'The top speed should be at least 2 digit number.'],
    },
    image: {
        type: String,
        required: [true, 'Image field is required'],
        match: [/^https?:\/\/.+/, 'The car image should start with http:// or https://'],
    },
    description: {
        type: String,
        required: [true, 'Description field is required'],
        minLength: [5, 'The description should be at least 5 characters.'],
        maxLength: [500, 'The description should be no longer than 500 characters.'],
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Car = model('Car', carSchema);

export default Car;