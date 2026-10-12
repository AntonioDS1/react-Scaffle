import './Badges.css';
import Badge from '../Badge/Badge';

const Badges = ({ book }) => {
  return (
    <div className="badges">
      {book.rated > 0 && <Badge type={`stella-${book.rated}`} />}
      {book.shelfed && <Badge type="segnalibro" />}
    </div>
  );
};

export default Badges;
