import './Pagination.css';
import Sorter from './Sorter/Sorter';
import SorterBtn from './Sorter/SorterBtn/SorterBtn';
import PageSelector from './PageSelector/PageSelector';

const Pagination = ({
  pagination,
  setPagination,
  books,
  bookshelf,
  activeLink,
  sortBy,
  setSortBy,
  mainWidth,
}) => {
  return (
    <div className="pagination">
      <Sorter mainWidth={mainWidth} setSortBy={setSortBy} sortBy={sortBy}>
        {[
          ...Array.from({ length: 6 }).map((s, i) => (
            <SorterBtn sortBy={sortBy} setSortBy={setSortBy} i={i} key={i} />
          )),
        ].reverse()}
      </Sorter>
      <PageSelector
        mainWidth={mainWidth}
        pagination={pagination}
        setPagination={setPagination}
        books={books}
        bookshelf={bookshelf}
        activeLink={activeLink}
      />
    </div>
  );
};

export default Pagination;
