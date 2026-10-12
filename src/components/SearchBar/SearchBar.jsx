import './SearchBar.css';
import { useKey } from '../../hooks/useKey';
import { useRef } from 'react';

const SearchBar = ({ query, setQuery, isLoadingBooks }) => {
  const search = useRef(null);
  useKey('Enter', () => {
    if (document.activeElement !== search.current) {
      search.current.focus();
      setQuery('');
    }
  });
  useKey('Escape', () => {
    if (document.activeElement === search.current) {
      search.current.blur();
    }
  });
  return (
    <div className="search-wrapper">
      <svg
        className="lens"
        width="20"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#676568"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10.5" cy="10.5" r="6.5" />
        <line x1="15.5" y1="15.5" x2="20" y2="20" />
      </svg>
      <input
        type="search"
        className="search"
        placeholder="Cerca per titolo o autore..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={search}
      />
      <svg
        className={`loader ${!isLoadingBooks ? 'hidden' : ''}`}
        width="28"
        height="28"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 5 A20 20 0 0 1 25 45"
          fill="none"
          stroke="#2f5d50"
          strokeWidth="5"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default SearchBar;
