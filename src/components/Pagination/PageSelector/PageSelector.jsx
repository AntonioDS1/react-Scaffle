import './PageSelector.css';
import { splitInChunks } from '../../../helpers/splitInChunks';
import { calculateResultsPerPage } from '../../../helpers/calculateResultsPerPage';
import { useEffect } from 'react';

const PageSelector = ({ pagination, setPagination, books, bookshelf, activeLink, mainWidth }) => {
  const ResultsPerPage = calculateResultsPerPage(mainWidth);
  const currentNumPages =
    activeLink === 0
      ? splitInChunks(books, null, ResultsPerPage).length
      : splitInChunks(bookshelf, null, ResultsPerPage).length;

  useEffect(() => {
    setPagination(mainWidth - mainWidth + 1);
  }, [setPagination, mainWidth]);

  return (
    <div className="page-selector">
      {currentNumPages > 1 && currentNumPages ? (
        <>
          {pagination > 1 ? (
            <button onClick={() => setPagination((prev) => (prev <= 1 ? prev : prev - 1))}>
              {'<'}
            </button>
          ) : null}
          <p>
            Pagina {pagination} di {currentNumPages}
          </p>
          {pagination !== currentNumPages ? (
            <button
              onClick={() => setPagination((prev) => (prev >= currentNumPages ? prev : prev + 1))}
            >
              {'>'}
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default PageSelector;
