import React, { useState, useEffect } from 'react';
import './App.css'

const SWAPI_URL = 'https://swapi.dev/api/people/';

function App() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);

  // Fetch characters
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${SWAPI_URL}?search=${query}&page=${page}`);
        const data = await response.json();

        if (response.ok) {
          setCharacters(data.results);
          setTotalPages(Math.ceil(data.count / 10)); 
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [query, page]); // Re-fetch when query or page changes

  // Pagination controls
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>

      
      <input 
        type="text" 
        placeholder="Search characters..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        className="search-box"
      />

      {/* Loader */}
      {loading && <div className="spin-loader">
        
        <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
        </div>
      </div>}
      

      {/* Error Handling */}
  
      {error && <div className="error-flex">
      <div className="error">
          <div className="error__icon">
              <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path></svg>
          </div>
          <div className="error__title">{error}</div>
         
      </div>
      </div>
        }

      

      {/* Character Table */}
      {!loading && !error && (
        <table className="character-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Height (cm)</th>
              <th>Birth Year</th>
            </tr>
          </thead>
          <tbody>
            {characters && characters.length > 0 ? (
              characters.map((char) => (
                <tr key={char.name}>
                  <td>{char.name}</td>
                  <td>{char.height}</td>
                  <td>{char.birth_year}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No characters found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      {!loading && !error && totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
