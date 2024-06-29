// EditPlaylist.jsx


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/EditPlaylist.module.css';


const EditPlaylist = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState({ name: '', songs: [] });
  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({ name: '', songs: '' });
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


    const fetchPlaylist = async () => {
      try {
        const { data } = await axios.get(`/api/playlists/${id}`);
        setPlaylist({ name: data.name, songs: data.songs.map(song => song._id) });
      } catch (error) {
        console.error('There was an error fetching the playlist!', error);
      }
    };


    fetchSongs();
    fetchPlaylist();
  }, [id]);


  useEffect(() => {
    validateForm();
  }, [playlist]);


  const validateForm = () => {
    let valid = true;
    let errors = { name: '', songs: '' };


    if (!playlist.name.trim()) {
      errors.name = 'Playlist name is required';
      valid = false;
    } else if (playlist.name.trim().length < 3) {
      errors.name = 'Playlist name must be at least 3 characters long';
      valid = false;
    }


    if (playlist.songs.length === 0) {
      errors.songs = 'At least one song must be selected';
      valid = false;
    }


    setErrors(errors);
    setFormValid(valid);
  };


  const handlePlaylistNameChange = (e) => {
    setPlaylist({ ...playlist, name: e.target.value });
  };


  const handleSongToggle = (songId) => {
    setPlaylist((prev) => {
      const songs = prev.songs.includes(songId)
        ? prev.songs.filter(id => id !== songId)
        : [...prev.songs, songId];
      return { ...prev, songs };
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear previous errors


    validateForm();
    if (!formValid) {
      return;
    }


    try {
      await axios.put(`/api/playlists/${id}`, playlist);
      navigate(`/playlists/${id}`);
    } catch (error) {
      setError('There was an error updating the playlist');
      console.error('There was an error updating the playlist!', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
      <div className={styles.formGroup}>
        <h2>Edit Playlist</h2>
        {error && <div className={styles.error}>{error}</div>}
        <label>
          Playlist Name:
          <input
            type="text"
            value={playlist.name}
            onChange={handlePlaylistNameChange}
            onBlur={validateForm}
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </label>
      </div>
      <div className={styles.formGroup}>
        <h3>Choose Songs</h3>
        <div className={styles.songList}>
          {songs.map(song => (
            <div key={song._id} className={styles.songItem}>
              <input
                type="checkbox"
                checked={playlist.songs.includes(song._id)}
                onChange={() => handleSongToggle(song._id)}
                onBlur={validateForm}
              />
              <span>{song.title}</span>
            </div>
          ))}
        </div>
        {errors.songs && <div className={styles.error}>{errors.songs}</div>}
      </div>
      <button
        type="submit"
        className={`${styles.createButton} ${!formValid ? styles.disabledButton : ''}`}
        disabled={!formValid}
      >
        Update Playlist
      </button>
    </form>
  );
};


export default EditPlaylist;
