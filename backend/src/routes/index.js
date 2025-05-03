import user from './user.js';
import auth from './auth.js';
import { notFound } from '../middleware/handle_error.js';

export const initRoutes = (app) => {
    app.use('/api/v1/user', user); 
    app.use('/api/v1/auth', auth); 

    app.use(notFound);
}