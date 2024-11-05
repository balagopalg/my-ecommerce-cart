import express from 'express';
import { Request, Response } from 'express';
import { handleValidationErrors, itemValidator, validateItem } from '../validators/itemValidator'
import { createItem } from '../controllers/itemController';

const router = express.Router();

router.post(
    'v1/items',
    itemValidator,
    validateItem,
    handleValidationErrors,
    createItem
);


export default router;
