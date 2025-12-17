import { Router } from 'express'
import { getDiscoverController } from '../modules/tmdb/tmdb.controller'

const router = Router();

router.get('/discover', getDiscoverController)

export default router;
