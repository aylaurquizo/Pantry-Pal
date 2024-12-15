import React from 'react';
import Home from './Home';
import Profile from './Profile';
import Favorites from './Favorites';
import Searched from './Searched'
import Recipe from './Recipe';
import { Route, Routes } from 'react-router-dom';

function Pages() {
  return (
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/profile" element={<Profile />} />
        <Route path ="/favorites" element={<Favorites />} />
        <Route path ="/searched/:search" element={<Searched />} />
        <Route path ="/recipe/:name" element={<Recipe />}/>
      </Routes>
  )
}

export default Pages
