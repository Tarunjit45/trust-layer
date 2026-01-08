/**
 * Custom application error class
 */
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly details?: any;

    constructor(message: string, statusCode: number = 500, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'AppError';

        // Maintains proper stack trace for where our error was thrown
        Error.captureStackTrace(this, this.constructor);
    }
}
