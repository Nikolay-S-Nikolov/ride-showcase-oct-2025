import { decodeToken } from '../utils/tokenUtils.js';

export default async function authMiddleware(req, res, next) {
    const token = req.cookies[process.env.AUTH_COOKIE_NAME];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await decodeToken(token);


        req.user = decodedToken;
        req.isAuthenticated = true;

        res.locals.user = decodedToken;
        res.locals.isAuthenticated = true;
        next();

    } catch (err) {
        res.clearCookie(process.env.AUTH_COOKIE_NAME);
        res.redirect('/auth/login');
    }
}

export function isAuth(req, res, next) {
    if (!req.isAuthenticated) {
        return res.redirect('/auth/login');
    }
    next();
}

export function isGuest(req, res, next) {
    if (req.isAuthenticated) {
        return res.redirect('/');
    }
    next();
}