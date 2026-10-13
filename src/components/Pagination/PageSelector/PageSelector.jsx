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
          {
            <button
              style={{ opacity: pagination > 1 ? 1 : 0 }}
              onClick={() => setPagination((prev) => (prev <= 1 ? prev : prev - 1))}
            >
              {'<'}
            </button>
          }
          <p>
            Pagina {pagination} di {currentNumPages}
          </p>
          {
            <button
              style={{ opacity: pagination !== currentNumPages ? 1 : 0 }}
              onClick={() => setPagination((prev) => (prev >= currentNumPages ? prev : prev + 1))}
            >
              {'>'}
            </button>
          }
        </>
      ) : null}
    </div>
  );
};

export default PageSelector;
