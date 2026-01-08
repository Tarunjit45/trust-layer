import { AzureAIService } from './azure-ai.service.js';
import { AnalysisResult } from '../types/analysis.types.js';
import { AppError } from '../utils/errors.js';

/**
 * Service layer for handling analysis logic
 */
export class AnalyzeService {
    private azureAI: AzureAIService;

    constructor() {
        this.azureAI = new AzureAIService();
    }

    /**
     * Analyze text input
     */
    async analyzeText(text: string): Promise<AnalysisResult> {
        if (!text || text.trim().length === 0) {
            throw new AppError('Text cannot be empty', 400);
        }

        try {
            // TODO: Integrate with Azure AI for text analysis
            const analysis = await this.azureAI.analyzeText(text);

            return {
                type: 'text',
                input: text,
                analysis,
                processedAt: new Date().toISOString()
            };
        } catch (error) {
            throw new AppError('Text analysis failed', 500, error);
        }
    }

    /**
     * Analyze image input
     */
    async analyzeImage(file: Express.Multer.File): Promise<AnalysisResult> {
        if (!file) {
            throw new AppError('No file provided', 400);
        }

        // Validate file type
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new AppError('Invalid file type. Only JPEG, PNG, and WebP are allowed', 400);
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            throw new AppError('File size exceeds 10MB limit', 400);
        }

        try {
            // TODO: Integrate with Azure AI for image analysis
            const analysis = await this.azureAI.analyzeImage(file);

            return {
                type: 'image',
                input: {
                    filename: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size
                },
                analysis,
                processedAt: new Date().toISOString()
            };
        } catch (error) {
            throw new AppError('Image analysis failed', 500, error);
        }
    }
}
