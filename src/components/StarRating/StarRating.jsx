import './StarRating.css';
import Star from './Star/Star';
import Button from '../Button/Button';
import { useState } from 'react';

const StarRating = ({
  maxRating = 5,
  color = '#FFC83D',
  strokeColor = 'lightgrey',
  size = '28.5',
  fontFamily = '"Outfit", sans-serif',
  messages = [],
  btnColor = '',
  withBtn = false,
  bgColor,
  defaultRating = 0,
  onSetRating,
  btnText = ['+ Add', '- Remove'],
  handleAdd,
  added,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [rated, setRated] = useState(defaultRating);

  const textStyle = {
    lineHeight: '1',
    color,
    fontSize: `clamp(12px, 8cqi, ${size / 1.22}px)`,
    marginLeft: '0.5em',
    flexShrink: 0,
  };

  const judgementStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color,
    fontSize: `${size / 1.2}px`,
    fontFamily: `${fontFamily}`,
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 600,
    width: 'auto',
    padding: 0,
    margin: 0,
  };

  const starsStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: `${-size / 7}px`,
    cursor: 'pointer',
    width: '100%',
  };

  const ratingStyle = {
    backgroundColor: { bgColor },
    display: 'flex',
    flexDirection: 'column',
    gap: `${size / 1.3}px`,
    width: '100%',
    containerType: 'inline-size',
  };

  const rateJudge = (rated, messagesLength, maxRating) => {
    // rated : maxRating = x : messagesLength

    return Math.floor((rated * (messagesLength - 1)) / maxRating);
  };

  return (
    <div style={ratingStyle}>
      <div style={starsStyle}>
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star
            key={i + 1}
            id={i + 1}
            active={rating > i}
            setRating={setRating}
            rated={rated}
            setRated={setRated}
            color={color}
            strokeColor={strokeColor}
            size={size}
            onClick={() => {
              setRated(rated === i + 1 ? 0 : i + 1);
              onSetRating?.(rated === i + 1 ? 0 : i + 1);
            }}
          />
        ))}
        <p style={textStyle}>{rated > 0 && messages.length === 0 ? rated : ''}</p>
      </div>
      {rated !== 0 && messages.length > 0 && (
        <div style={judgementStyle}>
          <p style={{ margin: '-1rem auto 0 auto', padding: 0 }}>
            {messages[rateJudge(rated, messages.length, maxRating)]}
          </p>
        </div>
      )}
      {rated !== 0 && withBtn && (
        <Button handleClick={handleAdd} btnColor={btnColor}>
          {added ? btnText[1] : btnText[0]}
        </Button>
      )}
    </div>
  );
};

export default StarRating;
