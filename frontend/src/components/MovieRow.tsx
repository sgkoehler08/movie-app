import { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";

// Horizontal carousel row used for featured movie sections
type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

type MovieRowProps = {
  title: string;
  movies: Movie[];
  onMovieClick: (id: number) => void;
  disabled?: boolean;
};

export default function MovieRow({
  title,
  movies,
  onMovieClick,
  disabled = false,
}: MovieRowProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Controls visibility of scroll arrows based on scroll position
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // Handles horizontal scroll navigation for carousel behavior
  const scroll = (direction: "left" | "right") => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const checkScroll = () => {
    if (!ref.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = ref.current;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
  }, [movies]);

  return (
    <div className="mb-8">

      <h2 className="text-xl font-bold mb-3">{title}</h2>

      <div className="relative -mx-6">
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 p-3 z-30 text-2xl rounded-full"
          >
            ◀
          </button>
        )}

        <div
          ref={ref}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scroll-smooth pl-12 pr-12 no-scrollbar"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={onMovieClick}
              disabled={disabled}
            />
          ))}
        </div>

        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 p-3 z-30 text-2xl rounded-full"
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
}