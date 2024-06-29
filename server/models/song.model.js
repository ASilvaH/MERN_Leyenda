// song.model.js

import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: { type: String, required: [true, "No dejes la canción sin título"] },
  artist: { type: String, required: true },
  genre: { type: String, required: true },
  album: { type: String, required: true },
});

const Song = mongoose.model('Song', songSchema);

export default Song;
