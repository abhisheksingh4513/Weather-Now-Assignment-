import { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto">
      <div className="flex flex-col gap-4">
        {/* Input with leading icon - soft pill look */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600/80 select-none">🔎</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name..."
            className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/70 text-gray-800 placeholder-gray-500 border border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-300/70 focus:border-purple-300/70 backdrop-blur-sm"
            disabled={loading}
          />
        </div>

        {/* Primary CTA - pill button */}
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="w-full py-4 rounded-2xl bg-white text-purple-700 font-semibold shadow-lg hover:shadow-xl hover:bg-white/95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/60 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-purple-300 border-t-transparent animate-spin"></span>
              Getting Weather...
            </span>
          ) : (
            <>
              <span>🔍</span>
              <span>Get Weather</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
