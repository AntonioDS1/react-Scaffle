import './Booklist.css';
import Book from '../Book/Book';
import { splitInChunks } from '../../helpers/splitInChunks';
import { calculateResultsPerPage } from '../../helpers/calculateResultsPerPage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Booklist = ({
  books,
  bookshelf,
  activeLink,
  pagination,
  query,
  selectedBook,
  setSelectedBook,
  errorBooks,
  mainWidth,
}) => {
  const booksPerPage = calculateResultsPerPage(mainWidth);

  const splittedBooks = splitInChunks(activeLink === 0 ? books : bookshelf, null, booksPerPage);
  const booksChunk = splittedBooks[pagination - 1];

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <>
      {query.length > 0 ? (
        <div className="results-count">
          <p>
            {activeLink === 0 ? books.length : bookshelf.length} risultati per {query}
          </p>
        </div>
      ) : null}
      <div className="booklist">
        {errorBooks ? (
          <ErrorMessage message={errorBooks.message} />
        ) : (
          <>
            <div className="results">
              {booksChunk
                ? booksChunk.map((b) => {
                    if (
                      activeLink === 1
                        ? b.title.toLowerCase().includes(query.toLowerCase()) ||
                          b.author_name.join('').toLowerCase().includes(query.toLowerCase())
                        : true
                    ) {
                      return (
                        <Book
                          key={b.key}
                          id={b.key}
                          title={b.title}
                          author_name={b.author_name}
                          cover_i={b.cover_i}
                          shelfed={b.shelfed}
                          rated={b.rated}
                          first_publish_year={b.first_publish_year}
                          selectedBook={selectedBook}
                          onClick={() => handleBookClick(b)}
                        />
                      );
                    }
                  })
                : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Booklist;
