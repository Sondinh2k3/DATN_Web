import db from '../models'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { raw } from 'mysql2';

require('dotenv').config();

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

export const register = ({email, password}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                email,
                password: hashPassword(password),
            },
          });

          const tocken = response[1] ? jwt.sign({ id: response[0].id, email: response[0].email, role_code: response[0].role_code }, process.env.JWT_SECRET, { expiresIn: '5d' }) : null;

        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'Create user success' : 'Email already exists',
            'access_token': `Bearer ${tocken}`
        });
    } catch (error) {
        reject(error);
    }
})

export const login = ({email, password}) => new Promise(async (resolve, reject) => {
    try {
        // Validate input
        if (!email || !password) {
            return resolve({
                err: 1,
                mes: 'Missing email or password',
                access_token: null
            });
        }

        // Find user by email
        const user = await db.User.findOne({
            where: { email },
            raw: true,
        });

        // If user not found
        if (!user) {
            return resolve({
                err: 1,
                mes: 'Email not found',
                access_token: null
            });
        }

        // Check password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        
        if (!isPasswordValid) {
            return resolve({
                err: 1,
                mes: 'Password is incorrect',
                access_token: null
            });
        }

        // Generate token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                role: user.role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '5d' }
        );

        resolve({
            err: 0,
            mes: 'Login success',
            access_token: `Bearer ${token}`
        });
    } catch (error) {
        console.error('Login error:', error);
        reject(error);
    }
})