import './App.css'
import { useEffect, useState } from "react";
import Header from './components/Header';
import MovieRow from './components/MovieRow';
import GenreBar from './components/GenreBar';
import MovieModal from './components/MovieModal';
import MovieGrid from './components/MovieGrid';

// App overview:
// - Manages global state (view, movies, modal)
// - Handles data fetching
// - Delegates UI rendering to reusable components


type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function App() {

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Controls which main section is rendered (home, search results, or genre)
  const [view, setView] = useState<"home" | "search" | "genre">("home");

  // Movie data for different views (search results, popular, top-rated)
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

  // Controls movie detail modal state and selected movie data
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Genre data and selected genre view
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<any>(null);
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);

  // Fetch movies based on search query and switch to search view
  const searchMovies = async () => {
    if (!query) return;

    try {
      setLoading(true);
      setView("search");

      const res = await fetch(
        `http://localhost:5000/api/movies/search?q=${query}`
      );

      const data = await res.json();

      setSearchResults(data.results);
    } catch (err) {
      console.error("SEARCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies for selected genre and switch to genre view
  const fetchGenreMovies = async (genre: any) => {
    setView("genre");
    setSelectedGenre(genre);
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/movies/genre/${genre.id}`
      );

      const data = await res.json();
      setGenreMovies(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch movie details and open modal
  const openMovie = async (id: number) => {
    setShowModal(true);
    setMovieDetails(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/movies/${id}`
      );

      const data = await res.json();
      setMovieDetails(data);
    } catch (err) {
      console.error("DETAIL ERROR:", err);
    }
  };

  // Fetch initial data (popular, top-rated, and genres) on first load
  useEffect(() => {
    const fetchMovies = async () => {
      const popularRes = await fetch("http://localhost:5000/api/movies/popular");
      const popularData = await popularRes.json();

      const topRes = await fetch("http://localhost:5000/api/movies/top-rated");
      const topData = await topRes.json();

      const genreRes = await fetch("http://localhost:5000/api/genres");
      const genreData = await genreRes.json();

      setPopularMovies(popularData.results);
      setTopRatedMovies(topData.results);
      setGenres(genreData.genres);
    };

    fetchMovies();
  }, []);


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <Header
        query={query}
        setQuery={setQuery}
        onSearch={searchMovies}
        onHome={() => {
          setView("home");
          setSearchResults([]);
          setSelectedGenre(null);
          setQuery("");
        }}
        showHomeButton={view !== "home"}
      />

      <GenreBar
        genres={genres}
        selectedGenre={selectedGenre}
        onSelect={fetchGenreMovies}
      />

      {view === "search" ? (
        <MovieGrid
          title="🔍 Search Results"
          movies={searchResults}
          onMovieClick={openMovie} 
        />
      ) : view === "genre" ? (
         <MovieGrid
          title={`🎭 ${selectedGenre?.name} Movies`}
          movies={genreMovies}
          onMovieClick={openMovie}
        />
       ) : (
        <>
          <MovieRow
            title="🔥 Popular"
            movies={popularMovies}
            onMovieClick={openMovie}
            disabled={showModal}
          />

           <MovieRow
            title="⭐ Top Rated"
            movies={topRatedMovies}
            onMovieClick={openMovie}
            disabled={showModal}
          />
        </>
      )}

      <MovieModal
        isOpen={showModal}
        movie={movieDetails}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
