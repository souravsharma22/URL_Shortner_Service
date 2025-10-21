import express from 'express';
import { generateNewURL , getAnalytics } from "../controllers/url.js";

const router = express.Router()

router.post('/', generateNewURL);

router.get('/analytics/:id',getAnalytics );

export default router;