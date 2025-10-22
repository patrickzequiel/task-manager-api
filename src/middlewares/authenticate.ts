import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/environment';

// TODO: this in fact gonna take the password from the db and then login the user and give a jwt token
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization || req.headers.Authorization as string;
    try {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const token = authHeader.substring(7);

        const JWT_SECRET = config.jwtSecret;
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        (req as any).user = decoded;

        next()
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
        next(error)
    }
};

