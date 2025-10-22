import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import * as userService from '../services/userService';
import user from '../models/userModel';
import { config } from '../config/environment';

// TODO: apply bcrypt hashing to passwords

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { username, password } = req?.body;
    try {
        const loggedUser = await userService.getUserByUsernameAndPassword(username, password);
        if (!loggedUser) {
            res.status(401).json({
                success: false,
                message: 'Invalid username or password',
            });
            return;
        };
        jwt.sign({ loggedUser }, config.jwtSecret, { expiresIn: '1h' }, (_err, token) => {
            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                token,
            })
        })
    } catch (error) {
        next(error)
    }
}

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { username, password, firstName, lastName, email } = req?.body;
    console.log(username, password);
    try {
        const registeredUser = await userService.createUser(username, password, firstName, lastName, email);
        console.log(registeredUser);
        jwt.sign({ user }, 'privateKey', { expiresIn: '1h' }, (_err, token) => {
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                token,
            })
        })
    } catch (error) {
        next(error)
    }
}   