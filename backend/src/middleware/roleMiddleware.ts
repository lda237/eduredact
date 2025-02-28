// src/middleware/roleMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest ';

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthenticatedRequest; // Conversion pour accéder à req.user

    if (!authReq.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Vérifie que le rôle de l'utilisateur est autorisé
    if (!allowedRoles.includes(authReq.user.role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    next();
  };
};
