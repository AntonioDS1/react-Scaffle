import './Star.css';

const Star = ({
  active,
  setRating = null,
  id = null,
  rated = null,
  color = null,
  strokeColor = null,
  size = null,
  onClick = null,
}) => {
  const Star = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="7 8 114 110"
      width="80%"
      height="80%"
      style={{ display: 'block' }}
    >
      <polygon
        points="64.0,14.0 81.6,43.7 115.4,51.3 92.5,77.3 95.7,111.7 64.0,98.0 32.3,111.7 35.5,77.3 12.6,51.3 46.4,43.7"
        fill={active ? color : 'none'}
        stroke={active ? color : strokeColor}
        strokeWidth="11"
        strokeLinejoin="round"
      />
    </svg>
  );
  const starStyle = {
    color,
    flex: '1 1 0',
    minWidth: 0,
    maxWidth: `${size}px`,
    aspectRatio: '1',
    marginTop: '8px',
  };

  const rate = () => {
    setRating(id);
  };

  const handleLeave = () => {
    if (!rated) {
      setRating(0);
      return;
    }
    setRating(rated);
  };

  return (
    <div
      style={starStyle}
      className="star"
      onMouseOver={rate}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {Star}
    </div>
  );
};

export default Star;
