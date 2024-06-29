// src/routes/playlist.routes.js

import express from 'express';
import { createPlaylist, getPlaylists, getPlaylistById, updatePlaylist, deletePlaylist } from '../controllers/playlist.controller.js';

const router = express.Router();

router.post('/playlists', createPlaylist);
router.get('/playlists', getPlaylists);
router.get('/playlists/:id', getPlaylistById);
router.put('/playlists/:id', updatePlaylist);
router.delete('/playlists/:id', deletePlaylist);

export default router;
