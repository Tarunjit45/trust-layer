import multer from 'multer';
import { Request } from 'express';

/**
 * Multer configuration for file uploads
 * Stores files in memory as Buffer for easy processing
 */
const storage = multer.memoryStorage();

/**
 * File filter to accept only images
 */
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'));
    }
};

/**
 * Multer upload instance
 * - Max file size: 10MB
 * - Memory storage for easy Azure integration
 */
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 1
    }
});
