// EditSong.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/EditSong.module.css';

const EditSong = () => {
  const { id } = useParams();
  const [song, setSong] = useState({ title: '', artist: '', genre: '', album: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const { data } = await axios.get(`/api/songs/${id}`);
        setSong(data);
      } catch (error) {
        console.error('There was an error fetching the song!', error);
      }
    };

    fetchSong();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!song.title.trim() || !song.artist.trim() || !song.genre.trim() || !song.album.trim()) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.put(`/api/songs/${id}`, song);
      navigate(`/songs/${id}`);
    } catch (error) {
      console.error('There was an error updating the song!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <h2>Edit Song</h2>
        {error && <div className={styles.error}>{error}</div>}
        <label>Title:</label>
        <input 
          type="text" 
          value={song.title} 
          onChange={(e) => setSong({ ...song, title: e.target.value })} 
          required 
        />
      </div>
      <div className={styles.formGroup}>
        <label>Artist:</label>
        <input 
          type="text" 
          value={song.artist} 
          onChange={(e) => setSong({ ...song, artist: e.target.value })} 
          required 
        />
      </div>
      <div className={styles.formGroup}>
        <label>Genre:</label>
        <input 
          type="text" 
          value={song.genre} 
          onChange={(e) => setSong({ ...song, genre: e.target.value })} 
          required 
        />
      </div>
      <div className={styles.formGroup}>
        <label>Album:</label>
        <input 
          type="text" 
          value={song.album} 
          onChange={(e) => setSong({ ...song, album: e.target.value })} 
          required 
        />
      </div>
      <button type="submit" className={styles.createButton}>Save Changes</button>
    </form>
  );
};

export default EditSong;
