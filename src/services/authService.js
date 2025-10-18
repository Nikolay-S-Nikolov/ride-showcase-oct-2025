import User from '../models/User.js';
import { generateAuthToken } from '../utils/tokenUtils.js';
import bcrypt from 'bcrypt';

export default {
    async register(userData) {
        if (userData.password !== userData.rePassword) {
            throw Error('Password Missmatch!');
        }

        const user = await User.findOne({ email: userData.email });

        if (user) {
            throw Error('User already exists!');
        }

        const newUser =  await User.create(userData);
        const token = await generateAuthToken(newUser);
        
        return token;
    },

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User or password are not matching!');
        }
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('User or password are not matching');
        }

        const token = await generateAuthToken(user);

        return token;
    },
};