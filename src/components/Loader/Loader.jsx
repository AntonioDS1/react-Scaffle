import './Loader.css';

const Loader = ({ color }) => {
  return (
    <div className="loader">
      <svg width="48" height="48" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25 5 A20 20 0 0 1 25 45"
          fill="none"
          stroke={color}
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

export default Loader;
