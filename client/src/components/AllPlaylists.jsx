// AllPlaylists.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/AllPlaylists.module.css';

const AllPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const { data } = await axios.get('/api/playlists');
        setPlaylists(data);
      } catch (error) {
        setError('There was an error fetching the playlists!');
        console.error('There was an error fetching the playlists!', error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>All Playlists</h1>
      <input
        type="text"
        placeholder="Search playlists"
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.playlistList}>
        {filteredPlaylists.map((playlist) => (
          <li key={playlist._id} className={styles.playlistItem}>
            <Link to={`/playlists/${playlist._id}`}>{playlist.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPlaylists;
