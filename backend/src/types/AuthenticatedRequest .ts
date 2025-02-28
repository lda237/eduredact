// src/types/AuthenticatedRequest.ts
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}
