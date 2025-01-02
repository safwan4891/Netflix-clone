import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import axios from 'axios';
import { API_KEY, imageUrl } from '../../Constants/Constants';
 
import './Banner.css';

export const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false); // Toggle for search input

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
      })
      .catch((error) => console.error('Error fetching trending movies:', error));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMovies(movies);
    } else {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
        .then((response) => setFilteredMovies(response.data.results))
        .catch((error) => console.error('Error searching movies:', error));
    }
  }, [searchQuery, movies]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        filteredMovies.length ? (prevIndex + 1) % filteredMovies.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredMovies]);

  const currentMovie = filteredMovies[currentIndex];

  const handlePlayTrailer = () => {
    if (!currentMovie) return;

    const endpoint =
      currentMovie.media_type === 'tv'
        ? `/tv/${currentMovie.id}/videos?api_key=${API_KEY}&language=en-US`
        : `/movie/${currentMovie.id}/videos?api_key=${API_KEY}&language=en-US`;

    axios.get(`https://api.themoviedb.org/3${endpoint}`).then((response) => {
      if (response.data.results.length !== 0) {
        setTrailerUrl(response.data.results[0].key);
      } else {
        console.log('Trailer Not Available');
        setTrailerUrl('');
      }
    });
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: { autoplay: 1 },
  };

  const handleCloseTrailer = () => setTrailerUrl('');

  return (
    <div>
      {/* Search Bar */}
      <div className="search-bar">
        {!showSearchInput && (
          <button
            className="search-icon"
            onClick={() => setShowSearchInput(true)}
          >
            🔍
          </button>
        )}
        {showSearchInput && (
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={() => setShowSearchInput(false)} // Close input when it loses focus
            className="search-input"
          />
        )}
      </div>

      {/* Banner Section */}
      <div
        style={{
          backgroundImage: `url(${currentMovie ? imageUrl + currentMovie.backdrop_path : ''})`,
        }}
        className="banner"
      >
        <div className="content">
          <h1 className="title">{currentMovie ? currentMovie.title || currentMovie.name : ''}</h1>
          <div className="banner_buttons">
            <button className="button" onClick={handlePlayTrailer}>
              Play
            </button>
            <button className="button">My List</button>
          </div>
          <h1 className="description">
            {currentMovie ? currentMovie.overview : 'No description available.'}
          </h1>
        </div>
        <div className="fade_bottom"></div>
      </div>

      {/* Trailer Section */}
      {trailerUrl && (
        <div className="trailer-container">
          <Youtube opts={opts} videoId={trailerUrl} />
          <button className="close-button" onClick={handleCloseTrailer}>
            X
          </button>
        </div>
      )}
    </div>
  );
};

