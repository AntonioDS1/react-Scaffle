import Link from '../Link/Link';
import './Navbar.css';
import logo from '/logo.png';
import { links } from '../../UIData/links';

const Navbar = ({ activeLink, setActiveLink, bookshelf }) => {
  return (
    <aside className="navbar">
      <div className="logo-nav">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <p>Scaffle</p>
        </div>
        <nav>
          <ul role="list" className="links">
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
      </div>
      <div className="navbar-footer">
        <p className="num-books">{bookshelf.length} libri </p>
        <p className="remaining-books">{bookshelf.filter((b) => !b.finished).length} da leggere</p>
      </div>
    </aside>
  );
};

export default Navbar;
