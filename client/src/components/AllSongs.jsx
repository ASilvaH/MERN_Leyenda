// AllSongs.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../css/AllSongs.module.css';

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { data } = await axios.get('/api/songs');
        setSongs(data);
      } catch (error) {
        setError('There was an error fetching the songs!');
        console.error('There was an error fetching the songs!', error);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    setFilteredSongs(
      songs.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.genre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, songs]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>All Songs</h1>
      <input
        type="text"
        placeholder="Search songs by name, artist, or genre"
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.songList}>
        {filteredSongs.map((song) => (
          <li key={song._id} className={styles.songItem}>
            <Link to={`/songs/${song._id}`}>{song.title}</Link> by {song.artist} ({song.genre})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllSongs;