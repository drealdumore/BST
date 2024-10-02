import React, { useState, useEffect } from 'react';

const SWAPI_URL = 'https://swapi.dev/api/people/';

function App() {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); // For pagination
  const [totalPages, setTotalPages] = useState(1);

  // Fetch characters from the API
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${SWAPI_URL}?search=${query}&page=${page}`);
        const data = await response.json();

        if (response.ok) {
          setCharacters(data.results);
          setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 results per page
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

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search characters..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        className="search-box"
      />

      {/* Loader */}
      {loading && <div className="loader">Loading...</div>}

      {/* Error Handling */}
      {error && <div className="error-message">{error}</div>}

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
