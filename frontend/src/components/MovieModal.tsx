// Displays movie details in a modal format
type MovieDetails = {
  title: string;
  vote_average: number;
  overview: string;
  credits?: {
    cast?: {
      id: number;
      name: string;
      character: string;
    }[];
  };
};

type MovieModalProps = {
  isOpen: boolean;
  movie: MovieDetails | null;
  onClose: () => void;
};

export default function MovieModal({
  isOpen,
  movie,
  onClose,
}: MovieModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 max-w-lg w-full p-6 rounded text-white relative">

        <button
          className="absolute top-2 right-2 text-white"
          onClick={onClose}
        >
          ✕
        </button>

        {movie ? (
          <>
            <h2 className="text-2xl font-bold mb-2">
              {movie.title}
            </h2>

            <p className="text-sm mb-4">
              ⭐ Rating: {movie.vote_average}
            </p>

            <p className="text-sm mb-4">
              {movie.overview}
            </p>

            <h3 className="font-bold mb-2">Cast</h3>

            <ul className="text-sm space-y-1">
              {movie.credits?.cast?.slice(0, 5).map((actor) => (
                <li key={actor.id}>
                  {actor.name} as {actor.character}
                </li>
              ))}
            </ul>
          </>
        ) : (
          // Loading fallback while fetching details
          <p>Loading movie details...</p>
        )}
      </div>
    </div>
  );
}