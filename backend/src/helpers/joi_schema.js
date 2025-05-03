import joi from 'joi';

export const username = joi.string().min(3).max(30).required();
export const email = joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }).required();
export const password = joi.string().min(6).required();