import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import './RowPost.css';
import { imageUrl, API_KEY } from '../../Constants/Constants';
import instance from '../../Axios';

export const RowPost = (props) => {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');

  useEffect(() => {
    instance
      .get(props.url)
      .then((response) => {
        const filteredMovies = response.data.results.filter(
          (movie) => movie.backdrop_path
        );
        setMovies(filteredMovies);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
      });
  }, [props.url]); // Added dependency array for props.url

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const handleMovie = (id, isTV) => {
    const endpoint = isTV
      ? `/tv/${id}/videos?api_key=${API_KEY}&language=en-US`
      : `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;

    instance
      .get(endpoint)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
        } else {
          console.log('Trailer Not Available');
        }
      })
      .catch((err) => {
        console.error('Error fetching trailer:', err);
      });
  };

  const handleCloseTrailer = () => {
    setUrlId('');
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            key={obj.id} // Added key prop for efficient rendering
            onClick={() => handleMovie(obj.id, props.isTVShow)}
            className={props.isSmall ? 'smallPoster' : 'poster'}
            alt="poster"
            src={`${imageUrl + obj.backdrop_path}`}
          />
        ))}
      </div>

      {urlId && (
        <div className="trailer-container">
          <Youtube opts={opts} videoId={urlId.key} />
          <button className="close-button" onClick={handleCloseTrailer}>
            X
          </button>
        </div>
      )}
    </div>
  );
};

