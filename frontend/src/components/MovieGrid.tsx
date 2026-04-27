import MovieCard from "./MovieCard";

// Renders a grid of MovieCard components
// Used for search results and genre-based movie listings
type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

type Props = {
  title?: string;
  movies: Movie[];
  onMovieClick: (id: number) => void;
};

export default function MovieGrid({ title, movies, onMovieClick }: Props) {
  if (!movies?.length) {
    return (
      <p className="text-gray-400 mt-4">
        No movies found.
      </p>
    );
  }

  return (
    <div className="mt-6">
      {title && (
        // Section title used for search and genre views
        <h2 className="text-xl font-bold mb-4">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onMovieClick(movie.id)}
         />
        ))}
      </div>
    </div>
  );
}