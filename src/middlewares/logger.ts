import { NextFunction, Request, Response } from 'express';

export const Logger = (req: Request, res: Response, next: NextFunction) => {
  console.info(`<-- ${req.method} ${req.originalUrl}`);
  const reqTime: number = Date.now();

  res.on('finish', () => {
    console.info(
      `--> ${req.method} ${res.statusCode} ${Date.now() - reqTime}ms ${
        res.get('Content-Length') || 0
      }b`,
    );
  });

  next();
};
