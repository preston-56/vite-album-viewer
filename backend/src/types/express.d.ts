import * as express from 'express';

export interface CustomBody {
  name?: string;
  username?: string;
  email?: string;
  userId?: string;
  title?: string;
  album?: string;
  url?: string;
}

declare global {
  namespace Express {
    interface Request {
      body: CustomBody; 
    }
  }
}
