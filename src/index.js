import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './routes/Home/Home';
import Movies from './routes/Movies/Movies';
import Series from './routes/Series/Series';
import AllMovies from './routes/AllMovies/AllMovies';
import SearchResults from './routes/SearchResults/SearchResults';

ReactDOM.render(
  <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movies" element={<Movies />} />
      <Route path="series" element={<Series />} />
      <Route path="movies-all" element={<AllMovies />} />
      <Route path="search-results" element={<SearchResults/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
