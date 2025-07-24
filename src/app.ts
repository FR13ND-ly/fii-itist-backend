import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import { AppEnv } from './config/env.config';
import authRoutes from './routes/authRoutes';
import partnerRoutes from './routes/partnersRoutes';
import scannerRoutes from './routes/scannerRoutes';
import sessionRoutes from './routes/sessionRoutes';
import speakersRoutes from './routes/speakersRoutes';
import usersRoutes from './routes/userRoutes';
import passport from 'passport';

require('./config/passport');

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cors({origin: '*'}));
app.use(session({
    secret: AppEnv.JWT_SECRET,
    resave: true,
    saveUninitialized: false,
}));
app.use(express.urlencoded({ extended: true }));

app.use(passport.session());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/scanner', scannerRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/speakers', speakersRoutes);
app.use('/api/users', usersRoutes);

export default app;