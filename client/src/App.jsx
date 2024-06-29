// App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AllSongs from './components/AllSongs';
import AddSong from './components/AddSong';
import SongDetails from './components/SongDetails';
import AddPlaylist from './components/AddPlaylist';
import AllPlaylists from './components/AllPlaylists';
import PlaylistDetails from './components/PlaylistDetails';
import EditPlaylist from './components/EditPlaylist';
import EditSong from './components/EditSong';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<AllSongs />} />
          <Route path="/songs/new" element={<AddSong />} />
          <Route path="/songs/:id" element={<SongDetails />} />
          <Route path="/songs/edit/:id" element={<EditSong />} />
          <Route path="/playlists" element={<AllPlaylists />} />
          <Route path="/playlists/new" element={<AddPlaylist />} />
          <Route path="/playlists/:id" element={<PlaylistDetails />} />
          <Route path="/playlists/edit/:id" element={<EditPlaylist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



