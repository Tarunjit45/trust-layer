import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { AppError } from '../utils/errors.js';

/**
 * Azure AI integration service
 * Ready for Azure OpenAI and Computer Vision integration
 */
export class AzureAIService {
    private client: OpenAIClient | null = null;
    private deploymentName: string;

    constructor() {
        this.deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || '';
        this.initializeClient();
    }

    /**
     * Initialize Azure OpenAI client
     */
    private initializeClient(): void {
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const apiKey = process.env.AZURE_OPENAI_API_KEY;

        if (!endpoint || !apiKey) {
            console.warn('⚠️  Azure OpenAI credentials not configured. Set AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_API_KEY in .env');
            return;
        }

        try {
            this.client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
            console.log('✅ Azure OpenAI client initialized');
        } catch (error) {
            console.error('❌ Failed to initialize Azure OpenAI client:', error);
        }
    }

    /**
     * Analyze text using Azure OpenAI
     */
    async analyzeText(text: string): Promise<any> {
        if (!this.client) {
            // Return mock response when Azure is not configured
            return {
                mock: true,
                message: 'Azure AI not configured. This is a mock response.',
                sentiment: 'neutral',
                keyPhrases: ['sample', 'analysis'],
                summary: `Analysis of: "${text.substring(0, 50)}..."`
            };
        }

        try {
            const messages = [
                {
                    role: 'system' as const,
                    content: 'You are an AI assistant that analyzes text and provides insights.'
                },
                {
                    role: 'user' as const,
                    content: `Analyze the following text and provide insights:\n\n${text}`
                }
            ];

            const result = await this.client.getChatCompletions(
                this.deploymentName,
                messages,
                {
                    maxTokens: 500,
                    temperature: 0.7
                }
            );

            return {
                analysis: result.choices[0]?.message?.content || 'No analysis available',
                model: this.deploymentName,
                usage: result.usage
            };
        } catch (error) {
            throw new AppError('Azure AI text analysis failed', 500, error);
        }
    }

    /**
     * Analyze image using Azure Computer Vision
     */
    async analyzeImage(file: Express.Multer.File): Promise<any> {
        if (!this.client) {
            // Return mock response when Azure is not configured
            return {
                mock: true,
                message: 'Azure AI not configured. This is a mock response.',
                description: 'Image analysis placeholder',
                tags: ['sample', 'image'],
                objects: []
            };
        }

        try {
            // TODO: Implement Azure Computer Vision API integration
            // For now, use GPT-4 Vision if available

            // Convert buffer to base64
            const base64Image = file.buffer.toString('base64');
            const imageUrl = `data:${file.mimetype};base64,${base64Image}`;

            const messages = [
                {
                    role: 'system' as const,
                    content: 'You are an AI assistant that analyzes images and provides detailed descriptions.'
                },
                {
                    role: 'user' as const,
                    content: [
                        {
                            type: 'text' as const,
                            text: 'Analyze this image and provide a detailed description.'
                        },
                        {
                            type: 'image_url' as const,
                            imageUrl: { url: imageUrl }
                        }
                    ]
                }
            ];

            const result = await this.client.getChatCompletions(
                this.deploymentName,
                messages as any,
                {
                    maxTokens: 500
                }
            );

            return {
                description: result.choices[0]?.message?.content || 'No description available',
                model: this.deploymentName,
                usage: result.usage
            };
        } catch (error) {
            throw new AppError('Azure AI image analysis failed', 500, error);
        }
    }
}
