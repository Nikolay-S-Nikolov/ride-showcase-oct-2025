import express from 'express';
import dotenv from 'dotenv';
import routes from './routes.js';
import handlebars from 'express-handlebars';
import pageHelper from './helpers/pageHelper.js';
import initDatabase from './config/dbConfig.js';
import cookieParser from 'cookie-parser';
import authMiddleware from './middlewares/authMiddleware.js';
// import { TempData } from './middlewares/tempDataMiddleware.js';
// import session from 'express-session';

dotenv.config()

const app = express();
const PORT = process.env.PORT; //TODO add port

initDatabase();

app.use(express.static('src/public'));

app.use(cookieParser());

// express sesion middleware
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false, httpOnly:true} 
// }))

app.use(express.urlencoded());

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        ...pageHelper,
    },
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(authMiddleware);

// use express session temData middleware
// app.use(TempData);

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

