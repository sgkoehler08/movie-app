// Header component for app branding, search input, and primary navigation actions
type HeaderProps = {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
  onHome: () => void;
  showHomeButton: boolean;
};

export default function Header({
  query,
  setQuery,
  onSearch,
  onHome,
  showHomeButton,
}: HeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-extrabold mb-2">
        🎬 Movie Night
      </h1>

      <p className="text-gray-400 mb-4">
        Discover movies by genre, popularity, or search your favorites
      </p>

      <div className="flex gap-3 items-center">
        <input
          className="flex-1 p-3 text-black rounded-lg"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
        />

        <button
          onClick={onSearch}
          className="bg-blue-600 px-4 py-3 rounded-lg hover:bg-blue-500"
        >
          Search
        </button>

        {showHomeButton && (
          // Shows only when not already on home view
          <button
            onClick={onHome}
            className="bg-gray-700 px-4 py-3 rounded-lg hover:bg-gray-600"
          >
            🏠
          </button>
        )}
      </div>
    </div>
  );
}