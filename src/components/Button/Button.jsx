import './Button.css';

const Button = ({ children, handleClick, btnColor, btnBorder, textColor, className }) => {
  return (
    <button
      className={`button ${className}`}
      type="submit"
      onClick={handleClick}
      style={{ backgroundColor: btnColor, border: `1px solid ${btnBorder}`, color: textColor }}
    >
      {children}
    </button>
  );
};

export default Button;
