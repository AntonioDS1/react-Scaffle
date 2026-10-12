import { useState } from 'react';
import './SorterBtn.css';

const SorterBtn = ({ sortBy, setSortBy, i }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      key={i + 1}
      className={`sort-by ${sortBy === i + 1 ? 'active' : ''}`}
      onClick={() => setSortBy(i + 1)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {i === 5 ? (
        'Tutti'
      ) : (
        <>
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="7 8 114 110"
              width="1rem"
              height="1rem"
              style={{ display: 'block' }}
            >
              <polygon
                points="64.0,14.0 81.6,43.7 115.4,51.3 92.5,77.3 95.7,111.7 64.0,98.0 32.3,111.7 35.5,77.3 12.6,51.3 46.4,43.7"
                fill={sortBy === i + 1 ? 'white' : hovered ? 'white' : `#25564c`}
                strokeWidth="11"
                strokeLinejoin="round"
              />
            </svg>
          }
          {i + 1}
        </>
      )}
    </button>
  );
};

export default SorterBtn;
