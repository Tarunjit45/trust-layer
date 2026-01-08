import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.js';

/**
 * Global error handling middleware
 */
export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Handle multer errors
    if (err instanceof Error && err.message.includes('File too large')) {
        res.status(413).json({
            success: false,
            error: 'File size exceeds 10MB limit',
            timestamp: new Date().toISOString()
        });
        return;
    }

    if (err instanceof Error && err.message.includes('Invalid file type')) {
        res.status(400).json({
            success: false,
            error: err.message,
            timestamp: new Date().toISOString()
        });
        return;
    }

    // Handle custom AppError
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: err.message,
            ...(process.env.NODE_ENV === 'development' && { details: err.details }),
            timestamp: new Date().toISOString()
        });
        return;
    }

    // Handle generic errors
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { message: err.message }),
        timestamp: new Date().toISOString()
    });
};
