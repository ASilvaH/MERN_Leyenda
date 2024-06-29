// SongDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/SongDetails.module.css';

const SongDetails = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
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

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/songs/${id}`);
      navigate('/');
    } catch (error) {
      console.error('There was an error deleting the song!', error);
    }
  };

  if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{song.title}</h1>
      <h2>Artist: {song.artist}</h2>
      <h3>Genre: {song.genre}</h3>
      <h4>Album: {song.album}</h4>
      <button className={styles.editButton} onClick={() => navigate(`/songs/edit/${id}`)}>Edit Song</button>
      <button className={styles.deleteButton} onClick={handleDelete}>Delete Song</button>
    </div>
  );
};

export default SongDetails;
