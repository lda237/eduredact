// src/types.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      }
    }
  }
}

// Make sure there are no exports
export {};