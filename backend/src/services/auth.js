import db from '../models'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { raw } from 'mysql2';

require('dotenv').config();

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const register = ({username, email, password}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                username,
                email,
                password: hashPassword(password),
                role: 'R3'
            },
        });

        if (!response[1]) {
            return resolve({
                err: 1,
                message: 'Email already exists',
                token: null,
                user: null
            });
        }

        const user = response[0].get({ plain: true });
        delete user.password;

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
            message: 'Create user success',
            token: `Bearer ${token}`,
            user
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
                message: 'Missing email or password',
                token: null,
                user: null
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
                message: 'Email not found',
                token: null,
                user: null
            });
        }

        // Check password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        
        if (!isPasswordValid) {
            return resolve({
                err: 1,
                message: 'Password is incorrect',
                token: null,
                user: null
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

        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user;

        resolve({
            err: 0,
            message: 'Login success',
            token: `Bearer ${token}`,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Login error:', error);
        reject(error);
    }
})