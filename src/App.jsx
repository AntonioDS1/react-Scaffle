import './App.css';
import { useState } from 'react';
import { useBooks } from './hooks/useBooks';
import { useElementWidth } from './hooks/useElementWidth';
import { useLocalStorage } from './hooks/useLocalStorage';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import InferiorNavBar from './components/InferiorNavBar/InferiorNavBar';
import SearchBar from './components/SearchBar/SearchBar';
import Booklist from './components/Booklist/Booklist';
import Pagination from './components/Pagination/Pagination';
import Checkout from './components/Checkout/Checkout';

function App() {
  const [activeLink, setActiveLink] = useState(0);
  const [bookshelf, setBookshelf] = useLocalStorage([], 'bookshelf');
  const [selectedBook, setSelectedBook] = useState(null);
  const [ratedBooks, setRatedBooks] = useLocalStorage([], 'ratedBooks');
  const [query, setQuery] = useState('');
  const [pagination, setPagination] = useState(1);
  const [sortBy, setSortBy] = useState(6);
  const { books, isLoading: isLoadingBooks, error: errorBooks } = useBooks(query);
  const [mainRef, mainWidth] = useElementWidth(500);

  const finalBooks = books.map((book) => {
    const ratedBook = ratedBooks.find((rb) => rb.key === book.key);

    const shelfedBook = bookshelf.find((sb) => sb.key === book.key);

    return {
      ...book,
      ...ratedBook,
      ...shelfedBook,
      rated: ratedBook?.rated ?? shelfedBook?.rated ?? book.rated ?? 0,
      shelfed: ratedBook?.shelfed ?? shelfedBook?.shelfed ?? book.shelfed ?? false,
    };
  });

  const sortBooks = (books) => {
    if (sortBy === 6) return books;

    return books.filter((b) => b.rated === sortBy);
  };

  return (
    <div className="app">
      <Navbar setActiveLink={setActiveLink} activeLink={activeLink} bookshelf={bookshelf} />
      <Main ref={mainRef}>
        <SearchBar query={query} setQuery={setQuery} isLoadingBooks={isLoadingBooks} />
        <Booklist
          mainWidth={mainWidth}
          books={sortBooks(finalBooks)}
          bookshelf={sortBooks(bookshelf)}
          activeLink={activeLink}
          pagination={pagination}
          setPagination={setPagination}
          sortBy={sortBy}
          query={query}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          isLoadingBooks={isLoadingBooks}
          errorBooks={errorBooks}
        />
        <Pagination
          mainWidth={mainWidth}
          pagination={pagination}
          setPagination={setPagination}
          books={sortBooks(finalBooks)}
          bookshelf={sortBooks(bookshelf)}
          activeLink={activeLink}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <InferiorNavBar
          setActiveLink={setActiveLink}
          activeLink={activeLink}
          bookshelf={bookshelf}
        />
      </Main>
      {selectedBook ? (
        <Checkout
          setSelectedBook={setSelectedBook}
          selectedBook={selectedBook}
          bookshelf={sortBooks(bookshelf)}
          setBookshelf={setBookshelf}
          ratedBooks={ratedBooks}
          setRatedBooks={setRatedBooks}
        />
      ) : null}
    </div>
  );
}

export default App;
