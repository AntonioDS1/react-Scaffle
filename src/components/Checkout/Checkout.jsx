import { useFetch } from '../../hooks/useFetch';
import { showNCWF } from '../../helpers/showNCWF';
import Loader from '../Loader/Loader';
import TextExpander from '../TextExpander/TextExpander';
import StarRating from '../StarRating/StarRating';
import Button from '../Button/Button';
import './Checkout.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const findNumOfPages = (data) => {
  if (!Array.isArray(data?.entries)) return '?';
  return data.entries.find((e) => e.number_of_pages)?.number_of_pages ?? '?';
};

const Checkout = ({ selectedBook, setSelectedBook, setBookshelf, setRatedBooks }) => {
  const { data, isLoading, error } = useFetch(
    selectedBook ? `https://openlibrary.org${selectedBook.key}/editions.json` : null,
  );

  const {
    data: work,
    isLoading: isLoadingWork,
    error: errorWork,
  } = useFetch(selectedBook ? `https://openlibrary.org${selectedBook.key}.json` : null);

  const description =
    typeof work?.description === 'string'
      ? work.description
      : (work?.description?.value ?? 'Nessuna descrizione disponibile');

  const rateBook = (rating) => {
    const newSelectedBook = {
      ...selectedBook,
      rated: rating,
      finished: rating === 0 ? false : true,
    };

    setBookshelf((prev) => prev.map((b) => (b.key === selectedBook.key ? newSelectedBook : b)));

    setRatedBooks((prev) => {
      const alreadyRated = prev.some((b) => b.key === selectedBook.key);

      if (alreadyRated) {
        return prev.map((b) => (b.key === selectedBook.key ? newSelectedBook : b));
      }

      return [...prev, newSelectedBook];
    });

    setSelectedBook(newSelectedBook);
  };
  const handleAdd = () => {
    const newSelectedBook = { ...selectedBook, shelfed: !selectedBook.shelfed };
    setSelectedBook(newSelectedBook);
    setBookshelf((prev) =>
      newSelectedBook.shelfed
        ? [...prev, newSelectedBook]
        : prev.filter((b) => b.key !== selectedBook.key),
    );
    setRatedBooks((prev) => prev.map((b) => (b.key === selectedBook.key ? newSelectedBook : b)));
  };

  const openOnLibrary = () => {
    const url = `https://openlibrary.org/search?q=${encodeURIComponent(selectedBook.title)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return selectedBook ? (
    <>
      <div className="overlay"></div>
      <aside className="checkout">
        <button className="x-btn" onClick={() => setSelectedBook(null)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        {isLoading || isLoadingWork ? (
          <div className="checkout-loader">
            <Loader color={'#2f5d50'} />
          </div>
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : errorWork ? (
          <ErrorMessage message={errorWork.message} />
        ) : (
          <div className="show-details">
            <img
              src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-M.jpg`}
              alt={selectedBook.title}
            />
            <div className="title-and-authors">
              <p className="title">{showNCWF(selectedBook.title, 9)}</p>
              <p className="authors">
                {showNCWF(selectedBook.author_name?.join(', ') ?? 'Autore sconosciuto', 5)}
              </p>
            </div>
            <div className="tags">
              <div>{selectedBook.first_publish_year}</div>
              <div>{findNumOfPages(data)} pagine</div>
              <div className="subject-tag">
                {showNCWF(
                  selectedBook.subject ? selectedBook.subject[0] : 'Genere non disponibile',
                  2,
                )}
              </div>
            </div>
            <TextExpander
              showNotCollapsedWords={20}
              expandButtonText="Mostra tutto"
              collapseButtonText="Mostra meno"
              buttonColor="#2f5d50"
              bgColor="white"
              border="none"
              textOverflow="scroll"
              containerHeight="8rem"
              textWidth="20rem"
            >
              {description}
            </TextExpander>
            <StarRating
              maxRating={5}
              defaultRating={selectedBook.rated || 0}
              onSetRating={rateBook}
            />
            <Button
              btnColor="#2f5d50"
              textColor="white"
              className="add-btn"
              handleClick={handleAdd}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill={selectedBook.shelfed ? 'white' : 'none'}
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6.5 3.5h11a1 1 0 0 1 1 1V20.5l-6.5-4.5-6.5 4.5V4.5a1 1 0 0 1 1-1z" />
              </svg>{' '}
              <p>
                {selectedBook.shelfed ? '- Rimuovi dallo scaffale' : '+ Aggiungi allo scaffale'}
              </p>
            </Button>
            <Button
              btnBorder="#2f5d50"
              btnColor="white"
              textColor="#2f5d50"
              className="ext-btn"
              handleClick={openOnLibrary}
            >
              {
                <svg
                  width={25}
                  height={25}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2f5d50"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              }{' '}
              <p>Apri su Open Library</p>
            </Button>
          </div>
        )}
      </aside>
    </>
  ) : null;
};

export default Checkout;
