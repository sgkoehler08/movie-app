// Card component for displaying a movie in rows or grids
type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

type MovieCardProps = {
  movie: Movie;
  onClick: (id: number) => void;
  size?: "small" | "large";
  disabled?:boolean;
};

export default function MovieCard({
  movie,
  onClick,
  size = "small",
  disabled=false,
}: MovieCardProps) {
  return (
    <div
      className={`bg-gray-800 p-3 rounded text-center transform transition-all duration-300
        ${
          // Disables hover/click interactions when modal is open
          disabled
          ? "cursor-default opacity-80"
          : "cursor-pointer hover:scale-105 hover:-translate-y-1 hover:z-20 hover:shadow-2xl"
        }
        ${size === "small" ? "min-w-[150px]" : ""}
      `}
      onClick={() => {
        // Prevents clicks when disabled
        if (!disabled) onClick(movie.id);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        className={`rounded mb-2 ${
          size === "large"
            ? "w-full h-[220px] object-cover"
            : "w-full h-[200px] object-cover"
        }`}
      />

      <p className="text-sm">{movie.title}</p>
    </div>
  );
}