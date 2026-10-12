import './Sorter.css';

const Sorter = ({ children, mainWidth, setSortBy, sortBy }) => {
  return (
    <div className="sorter">
      {mainWidth > 715 ? (
        children
      ) : (
        <select
          className="sorter-selector"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value === 'Tutti' ? 6 : +e.target.value)}
        >
          {children.map((child, i) => (
            <option key={i}>{child.props.i === 5 ? 'Tutti' : child.props.i + 1}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Sorter;
