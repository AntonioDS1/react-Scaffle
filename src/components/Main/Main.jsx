import './Main.css';

const Main = ({ children, ref }) => {
  return (
    <main className="main" ref={ref}>
      <div className="show-search">
        {children[0]}
        {children[1]}
      </div>
      {children.slice(2)}
    </main>
  );
};

export default Main;
