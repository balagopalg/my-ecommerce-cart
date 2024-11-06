import { Response } from 'express';
import { IResponsePayload } from 'types/generic';

export const handleError = (res: Response, error: unknown): void => {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ statusCode: 400, message: error.message, data: null });
      } else if (error.name === 'DuplicateError') {
        res.status(409).json({ statusCode: 409, message: error.message, data: null });
      } else {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
      }
    } else {
      res.status(500).json({
        statusCode: 500,
        message: 'An unexpected error occurred',
        data: process.env.NODE_ENV === 'development' ? String(error) : null,
      });
    }
};
  

export const handleResponse = <T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T
  ): void => {
    const payload: IResponsePayload<T> = {
      statusCode,
      message,
      data,
    };
    res.status(statusCode).json(payload);
  };
