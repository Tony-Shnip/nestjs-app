import { HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import {
  createAnimalSchema,
  updateAnimalSchema,
} from './schemes/animals.schema';

export async function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const schema =
    req.method === 'POST' ? createAnimalSchema : updateAnimalSchema;

  return await schema
    .validate(req.body)
    .then(() => {
      return next();
    })
    .catch(err => {
      throw new HttpException(
        {
          success: false,
          data: {
            errorName: err.name,
            message: err.message,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    });
}
