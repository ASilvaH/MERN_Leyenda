// AddPlaylist.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../css/AddPlaylist.module.css';

const AddPlaylist = () => {
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { data } = await axios.get('/api/songs');
        setSongs(data);
      } catch (error) {
        console.error('There was an error fetching the songs!', error);
      }
    };

    fetchSongs();
  }, []);

  const handleSongToggle = (songId) => {
    setPlaylist((prev) => {
      if (prev.includes(songId)) {
        return prev.filter(id => id !== songId);
      } else {
        return [...prev, songId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!playlistName.trim()) {
      setError('Playlist name is required');
      return;
    }

    if (playlist.length === 0) {
      setError('At least one song must be selected');
      return;
    }

    const newPlaylist = {
      name: playlistName,
      songs: playlist
    };

    try {
      await axios.post('/api/playlists', newPlaylist);
      setPlaylist([]);
      setPlaylistName('');
      setError('');
      navigate('/playlists');
    } catch (error) {
      console.error('There was an error creating the playlist!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <h2>Create New Playlist</h2>
        {error && <div className={styles.error}>{error}</div>}
        <label>Playlist Name:</label>
        <input 
          type="text" 
          value={playlistName} 
          onChange={(e) => setPlaylistName(e.target.value)} 
          required 
        />
      </div>
      <div className={styles.formGroup}>
        <h2>Choose Songs</h2>
        <ul className={styles.songList}>
          {songs.map((song) => (
            <li key={song._id} className={styles.songItem}>
              <input 
                type="checkbox" 
                checked={playlist.includes(song._id)} 
                onChange={() => handleSongToggle(song._id)} 
              />
              <label>{song.title}</label>
            </li>
          ))}
        </ul>
      </div>
      <button type="submit" className={styles.createButton}>Create Playlist</button>
    </form>
  );
};

export default AddPlaylist;
