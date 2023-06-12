import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  console.log("ENV API KEY test: ", process.env.REACT_APP_TMDB_API_KEY);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  // const API_KEY = "e525763e028021a4ff39215c31bf71f2";

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="container">
      <h1 className="mb-4">Search Results</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {searchResults.length > 0 ? (
        <div className="row">
          {searchResults.map((result) => (
            <div className="col-md-4 mb-4" key={result.id}>
              <div className="card">
                <Link to={`/movie-content/${result.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                    alt={result.title}
                    className="card-img-top"
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{result.title}</h5>
                  <p className="card-text">{result.overview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
