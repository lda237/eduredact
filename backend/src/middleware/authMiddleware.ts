import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "Server configuration error: JWT_SECRET is missing" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; role: string };
    // Ici, nous assignons à req.user, et dans nos contrôleurs, nous utilisons AuthenticatedRequest
    (req as any).user = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
