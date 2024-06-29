// Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/">Songs</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/playlists">Playlists</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/songs/new">Add Song</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/playlists/new">Add Playlist</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
