import './Link.css';
import { cloneElement } from 'react';

const Link = ({ id, icon, role, activeLink, setActiveLink }) => {
  return (
    <li>
      <button
        className={`link ${id === activeLink ? 'active-link' : ''}`}
        onClick={() => setActiveLink(id)}
      >
        {cloneElement(icon, {
          stroke: activeLink === id ? '#25564C' : '#676568',
        })}
        {role}
      </button>
    </li>
  );
};

export default Link;
