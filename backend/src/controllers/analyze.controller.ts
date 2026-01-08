import { Request, Response, NextFunction } from 'express';
import { AnalyzeService } from '../services/analyze.service.js';
import { AppError } from '../utils/errors.js';

const analyzeService = new AnalyzeService();

/**
 * Controller for handling analysis requests
 */
export const analyzeController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { text } = req.body;
        const file = req.file;

        // Validate input
        if (!text && !file) {
            throw new AppError('Either text or image must be provided', 400);
        }

        let result;

        if (file) {
            // Handle image analysis
            result = await analyzeService.analyzeImage(file);
        } else {
            // Handle text analysis
            result = await analyzeService.analyzeText(text);
        }

        res.status(200).json({
            success: true,
            data: result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
};
