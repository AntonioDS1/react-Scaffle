import './ErrorMessage.css';
const errorIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
    <path d="M18.5 3.5 L35 33.5 H2 Z" stroke="#25564c" strokeWidth="2.5" strokeLinejoin="round" />
    <line
      x1="18.5"
      y1="13.5"
      x2="18.5"
      y2="23.5"
      stroke="#25564c"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="18.5" cy="28.5" r="1.7" fill="#25564c" />
  </svg>
);

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      {errorIcon} {message}!
    </div>
  );
};

export default ErrorMessage;
