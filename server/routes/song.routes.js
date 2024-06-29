// song.routes.js

import express from 'express';
import { 
  getAllSongs, 
  getSongById, 
  createSong, 
  deleteSong, 
  updateSong 
} from '../controllers/song.controller.js';

const router = express.Router();

router.get('/songs', getAllSongs);
router.get('/songs/:id', getSongById);
router.post('/songs', createSong);
router.put('/songs/:id', updateSong);
router.delete('/songs/:id', deleteSong);

export default router;
