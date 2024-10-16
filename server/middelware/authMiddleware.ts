import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IUserPayload {
  userId: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return; // Ensure the function stops here
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUserPayload;
    req.user = decoded;
    next(); // Call next to proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
    return; // Ensure the function stops here
  }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ message: 'Access denied, admin only' });
    return; // Ensure the function stops here
  }
  next(); // Call next to proceed to the next middleware or route handler
};
