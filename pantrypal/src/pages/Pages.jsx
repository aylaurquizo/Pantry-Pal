import React from 'react';
import Home from './Home';
import Profile from './Profile';
import Favorites from './Favorites';
import { Route, Routes } from 'react-router-dom';

function Pages() {
  return (
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/profile" element={<Profile />} />
        <Route path ="/favorites" element={<Favorites />} />
      </Routes>
  )
}

export default Pages
