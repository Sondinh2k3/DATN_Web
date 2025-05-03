import { email, password, username } from "../helpers/joi_schema.js";
import { internalServerError } from "../middleware/handle_error.js";
import * as services from "../services";
import joi from "joi";

export const register = async (req, res) => {
    try {
        // Validate request body
        const { error } = joi.object({
            username,
            email,
            password
        }).validate(req.body);
        
        if (error) {
            return res.status(400).json({
                err: 1,
                message: error.details[0].message
            });
        }

        // Call register service
        const response = await services.register(req.body);
        
        // Return response based on service result
        return res.status(response.err === 0 ? 200 : 400).json(response);
        
    } catch (error) {
        console.error('Register error:', error);
        return internalServerError(res);
    }
}

export const login = async (req, res) => {
    try {
        // Validate request body
        const { error } = joi.object({
            email,
            password
        }).validate(req.body);
        
        if (error) {
            return res.status(400).json({
                err: 1,
                message: error.details[0].message
            });
        }

        // Call login service
        const response = await services.login(req.body);
        
        // Return response based on service result
        return res.status(response.err === 0 ? 200 : 400).json(response);
        
    } catch (error) {
        console.error('Login error:', error);
        return internalServerError(res);
    }
}