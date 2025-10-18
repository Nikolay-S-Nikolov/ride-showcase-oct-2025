import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: { //TODO 
        type: String,
        // match: [/^\S+@\S+\.\S+$/, 'Invalid email string'], 
        required: [true, 'Email is required'],
        // minLength: [10, 'Email should be at least 10 char long'],
        unique: true,
    },
    password: { //TODO 
        type: String,
        // match: [/^[A-Za-z0-9]+$/, 'Password consist only of English letters and digits'],
        // minLength: [6, 'Minimu length of password is 6 char'],
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