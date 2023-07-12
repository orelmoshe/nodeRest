import express from 'express';
import { getHealth, createEntities, getEntities, getAllActionIds, uploadCsv } from '../controllers/controller.js';

const router = express.Router({ mergeParams: true });

router.get('/health', getHealth);
router.post('/csv', uploadCsv);
router.post('/create-entities', createEntities);
router.get('/get-entities/:actionId', getEntities);
router.get('/get-actionIds', getAllActionIds);

export default router;
