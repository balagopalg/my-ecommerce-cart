import { Request, Response } from 'express';
import * as itemService from '../services/itemService';
import { ICreateItemRequest, IGetItemRequest } from '../../types/item';
import { handleError, handleResponse } from '../utils/utils';

export const createItem = async (
  req: Request<{}, {}, ICreateItemRequest>,
  res: Response
): Promise<void> => {
  try {
    await itemService.createItem(req.body);
    handleResponse(res, 200, 'Item created successfully');
  } catch (error) {
    handleError(res, error);
  }
};

export const listItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await itemService.getItems();
    handleResponse(res, 200, 'Items retrieved successfully', items);
  } catch (error) {
    handleError(res, error);
  }
};

export const getItem = async (
  req: Request<{ id: string }, {}, IGetItemRequest>,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const items = await itemService.getItemById(id); 
    handleResponse(res, 200, 'Item retrieved successfully', items);
  } catch (error) {
    handleError(res, error);
  }
};

