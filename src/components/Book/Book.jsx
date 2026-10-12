import './Book.css';
import Badges from '../Badges/Badges';
import { showNCWF } from '../../helpers/showNCWF';

const Book = ({
  title,
  author_name,
  cover_i,
  shelfed,
  rated,
  first_publish_year,
  onClick,
  id,
  selectedBook,
}) => {
  const authors = author_name?.join(', ') ?? 'Autore sconosciuto';

  return (
    <article
      className={`book-card ${selectedBook && id === selectedBook.key ? 'active' : ''}`}
      onClick={onClick}
    >
      <Badges book={{ rated, shelfed }} />
      <img src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`} alt={title} />
      <h3 className="book-title" title={title}>
        {showNCWF(title, 4)}
      </h3>
      <p className="book-authors" title={authors}>
        {showNCWF(authors, 4)}
      </p>
      <p className="book-year">{first_publish_year}</p>
    </article>
  );
};

export default Book;
