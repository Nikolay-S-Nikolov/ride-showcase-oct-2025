import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'The first name is required'],
        minLength: [3, 'The first name should be at least 3 characters long'],
    },
    lastName: {
        type: String,
        required: [true, 'The last name is required'],
        minLength: [3, 'The last name should be at least 3 characters long.'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, 'Email should be at least 10 char long'],
        unique: true,
    },
    password: { //TODO 
        type: String,
        minLength: [4, 'The password should be at least 4 characters long.'],
        required: [true, 'Please enter password'],
    }
});

userSchema.virtual('rePassword')
    .get(function () {
        return this._rePassword;
    })
    .set(function (value) {
        this._rePassword = value;
    });

userSchema.pre('validate', function (next) {
    if (this.isNew && this.rePassword != this.password) {
        this.invalidate(this.password, 'Password missmatch')
    };
    next();
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;