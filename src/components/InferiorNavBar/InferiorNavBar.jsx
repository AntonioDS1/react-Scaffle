import './InferiorNavBar.css';
import logo from '/logo.png';
import { links } from '../../UIData/links';
import Link from '../Link/Link';

const InferiorNavBar = ({ activeLink, setActiveLink, bookshelf }) => {
  return (
    <div className="inferior-navbar">
      <img src={logo} alt="logo" />
      <nav>
        <ul role="list" className="inferior-links">
          {links.map((link, i) => (
            <Link
              key={i}
              id={i}
              icon={link.icon}
              role={link.role}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
          ))}
        </ul>
      </nav>
      <div className="navbar-footer">
        <p className="num-books">{bookshelf.length} libri </p>
        <p className="remaining-books">{bookshelf.filter((b) => !b.finished).length} da leggere</p>
      </div>
    </div>
  );
};

export default InferiorNavBar;
