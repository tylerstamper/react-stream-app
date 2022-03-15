import { Link, Navigate } from 'react-router-dom';
import search from '../../Assets/search.png';
import { useEffect, useState } from 'react';
import './Nav.css';
import key from '../../key';
import { useNavigate } from 'react-router-dom';

export default function Nav(){

  const [query, setQuery] = useState();
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log(query);
    fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${key}&language=en-US&page=1&include_adult=false`)
    .then(function(response){
      return response.json();
    })
    .then(function(response){
      navigate('/search-results', { state: { response: response.results, query: query } });
    })
  }

    return(
      <div className='div-nav-container'>
      <h2 className='nav-h2'>STREAM APP</h2>
        <nav className='nav-main'>
        <Link className='link' to="/">Home</Link>
        <Link className='link' to="/movies">Movies</Link>
        <Link className='link' to="/Series">Series</Link>
        <div className='search-container'>
          <input onChange={e => setQuery(e.target.value)} className='search-input' type='search' placeholder='Search...'/>
          <input onClick={() => handleSearch()} className='search-icon' type='image' src={search}/>
        </div>
        </nav>
      </div>
    );
}