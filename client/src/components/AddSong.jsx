// AddSong.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../css/AddSong.module.css';

const AddSong = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [album, setAlbum] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSong = {
      title,
      artist,
      genre,
      album,
    };

    try {
      await axios.post('/api/songs', newSong);
      navigate('/');
    } catch (error) {
      console.error('There was an error creating the song!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
      <h2>New Song</h2>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label>Artist:</label>
        <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label>Album:</label>
        <input type="text" value={album} onChange={(e) => setAlbum(e.target.value)} required />
      </div>
      <button className={styles.addButton} type="submit">Add Song</button>
    </form>
  );
};

export default AddSong;
