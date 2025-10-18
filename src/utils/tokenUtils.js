import util from 'util';
import jwt from 'jsonwebtoken';

export async function generateAuthToken(user) {
    const sign = util.promisify(jwt.sign);
    const payload = {
        id: user.id,
        email: user.email,
    };

    const token = await sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '2h' },
    );
    return token;
}

export async function decodeToken(token) {
    const verify = util.promisify(jwt.verify);
    
    const decodedToken = await verify(
        token,
        process.env.JWT_SECRET,
    );
    return decodedToken;
}

