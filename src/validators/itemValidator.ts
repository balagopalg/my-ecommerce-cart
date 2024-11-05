import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

interface CreateItemDTO {
  name: string;
  price: number;
  description: string;
  quantity: number;
  isAvailable: boolean;
}

export const itemValidator: ValidationChain[] = [
  body('name')
    .trim() 
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number')
    .custom((value) => {
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    })
    .withMessage('Price can only have up to 2 decimal places'),

  body('description')
    .trim()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  body('quantity')
    .isNumeric()
    .withMessage('Quantity must be a number')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a positive integer')
    .toInt(), 

  body('isAvailable')
    .isBoolean()
    .withMessage('isAvailable must be a boolean')
    .optional()
    .default(true), 
];

export const validateItem = (
  req: Request<{}, {}, CreateItemDTO>,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      message: error.msg,
    }));

    res.status(400).json({
      success: false,
      errors: formattedErrors,
      message: 'Validation failed'
    });
    return;
  }

  const sanitizedBody = {
    name: req.body.name?.trim(),
    price: Number(req.body.price),
    description: req.body.description?.trim(),
    quantity: Number(req.body.quantity),
    isAvailable: Boolean(req.body.isAvailable ?? true)
  };

  req.body = sanitizedBody;
  
  next();
};

export const handleValidationErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof Error) {
    res.status(400).json({
      success: false,
      error: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  } else {
    next(err);
  }
};