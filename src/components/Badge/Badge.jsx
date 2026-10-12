import './Badge.css';

const Badge = ({ type, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="badge">
    <use href={`/Badges.svg#${type}`} />
  </svg>
);

export default Badge;
