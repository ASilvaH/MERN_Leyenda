// src/controllers/playlist.controller.js
import asyncHandler from 'express-async-handler';
import Playlist from '../models/playlist.model.js';

export const createPlaylist = asyncHandler(async (req, res) => {
  const { name, songs } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Playlist name is required');
  }

  if (!Array.isArray(songs)) {
    res.status(400);
    throw new Error('Songs must be an array');
  }

  const newPlaylist = new Playlist({ name, songs });

  try {
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500);
    throw new Error('Error creating playlist');
  }
});

export const getPlaylists = asyncHandler(async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs');
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching playlists');
  }
});

export const getPlaylistById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const playlist = await Playlist.findById(id).populate('songs');
    if (!playlist) {
      res.status(404);
      throw new Error('Playlist not found');
    }
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching playlist');
  }
});

export const updatePlaylist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, songs } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Playlist name is required');
  }

  if (!Array.isArray(songs)) {
    res.status(400);
    throw new Error('Songs must be an array');
  }

  try {
    const playlist = await Playlist.findByIdAndUpdate(id, { name, songs }, { new: true }).populate('songs');
    if (!playlist) {
      res.status(404);
      throw new Error('Playlist not found');
    }
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500);
    throw new Error('Error updating playlist');
  }
});

export const deletePlaylist = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const playlist = await Playlist.findByIdAndDelete(id);
    if (!playlist) {
      res.status(404);
      throw new Error('Playlist not found');
    }
    res.status(200).json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500);
    throw new Error('Error deleting playlist');
  }
});
