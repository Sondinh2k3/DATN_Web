import * as user from '../controllers/user.js';
import express from 'express';

const router = express.Router();

router.get('/', user.getUsers);

export default router;