// PlaylistDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/PlaylistDetails.module.css';

const PlaylistDetails = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const { data } = await axios.get(`/api/playlists/${id}`);
        setPlaylist(data);
      } catch (error) {
        console.error('There was an error fetching the playlist!', error);
      }
    };

    fetchPlaylist();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/playlists/${id}`);
      navigate('/playlists');
    } catch (error) {
      console.error('There was an error deleting the playlist!', error);
    }
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{playlist.name}</h1>
      <h2>Songs</h2>
      <ul className={styles.songList}>
        {playlist.songs.map((song) => (
          <li key={song._id} className={styles.songItem}>
            {song.title}
          </li>
        ))}
      </ul>
      <button className={styles.editButton} onClick={() => navigate(`/playlists/edit/${id}`)}>Edit Playlist</button>
      <button className={styles.deleteButton} onClick={handleDelete}>Delete Playlist</button>
    </div>
  );
};

export default PlaylistDetails;
