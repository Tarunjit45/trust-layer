/**
 * Type definitions for analysis operations
 */

export interface AnalysisResult {
    type: 'text' | 'image';
    input: string | ImageInput;
    analysis: any;
    processedAt: string;
}

export interface ImageInput {
    filename: string;
    mimetype: string;
    size: number;
}

export interface TextAnalysisResponse {
    sentiment?: string;
    keyPhrases?: string[];
    summary?: string;
    [key: string]: any;
}

export interface ImageAnalysisResponse {
    description?: string;
    tags?: string[];
    objects?: any[];
    [key: string]: any;
}
