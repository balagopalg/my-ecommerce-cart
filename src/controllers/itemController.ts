import { Request, Response } from 'express';
import * as itemService from '../services/itemService';
import { ICreateItemRequest } from '../../types/item';

export const createItem = async (
  req: Request<{}, {}, ICreateItemRequest>,
  res: Response
): Promise<void> => {
  try {
    const item = await itemService.createItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
      } else if (error.name === 'DuplicateError') {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(500).json({ 
        error: 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      });
    }
  }
};
