import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MovieContent from './movie-content';
import SearchResults from './search-results';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="nav nav-tabs mb-2">
          <Link className="nav-link" to="/movie-content"> Movie Content</Link>
          <br />
          <Link className="nav-link" to="/search-results"> Search Results</Link>
        </nav>
        <Routes>
          <Route path="/movie-content/:movieId" element={<MovieContent />} />
          <Route path="/search-results/*" element={<SearchResults />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
