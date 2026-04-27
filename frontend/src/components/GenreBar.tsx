// Displays a horizontal list of genres, allowing users to filter movies by genre
type Genre = {
  id: number;
  name: string;
};

type GenreBarProps = {
  genres: Genre[];
  selectedGenre: Genre | null;
  onSelect: (genre: Genre) => void;
};

export default function GenreBar({
  genres,
  selectedGenre,
  onSelect,
}: GenreBarProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-3">
        Browse by Genre
      </h2>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelect(genre)}
            className={`px-4 py-2 rounded-full text-sm transition whitespace-nowrap
              ${
                selectedGenre?.id === genre.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }
            `}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}