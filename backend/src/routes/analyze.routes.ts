import { Router } from 'express';
import { analyzeController } from '../controllers/analyze.controller.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

/**
 * POST /api/analyze
 * Accepts text or image upload for AI analysis
 * 
 * Body (for text):
 * {
 *   "text": "Your text to analyze"
 * }
 * 
 * Body (for image):
 * - multipart/form-data with field name "image"
 */
router.post('/', upload.single('image'), analyzeController);

export default router;
