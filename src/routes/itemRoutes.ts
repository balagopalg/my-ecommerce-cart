import express from 'express';
import { handleValidationErrors, itemValidator } from '../validators/itemValidator';
import { createItem, getItem, listItem } from '../controllers/itemController';

const router = express.Router();

// Route to create an item
router.post(
    '/items',
    itemValidator,
    handleValidationErrors,
    createItem
);

// Route to list all items
router.get('/items', listItem);

// Route to get a specific item by ID
router.get('/items/:id', getItem);

export default router;
