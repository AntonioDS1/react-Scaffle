import { useState } from 'react';
import { showNCWF } from '../../helpers/showNCWF';

const cutText = (text, numOfWords) => {
  const split = text.split(/(?<![,])(?= )/);
  return `${split.slice(0, split.length - numOfWords).join('')}...`;
};

const TextExpander = ({
  collapseNumWords = 0,
  expandButtonText,
  collapseButtonText,
  buttonColor,
  openedByDefault = false,
  padding,
  children,
  size,
  color,
  bgColor,
  border,
  margin,
  borderRadius,
  textOverflow,
  containerHeight,
  showNotCollapsedWords,
  textWidth,
}) => {
  const [isOpen, setIsOpen] = useState(openedByDefault);

  const textShown = isOpen
    ? children
    : showNotCollapsedWords
      ? showNCWF(children, showNotCollapsedWords)
      : cutText(children, collapseNumWords);

  const buttonStyle = {
    color: buttonColor || 'blue',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontWeight: 700,
  };

  const textStyle = {
    padding: padding || 0,
    color: color || 'black',
    fontSize: size || '14px',
    backgroundColor: bgColor || '#f7f7f7',
    border: border || '1px solid #ddd',
    margin: margin || 0,
    borderRadius: borderRadius || 0,
    overflow: textOverflow || 'none',
    maxHeight: containerHeight || 'auto',
    height: 'fit-content',
    width: textWidth || 'auto',
    transition: 'all 0.3s ease',
  };

  return (
    <div className="expander">
      <div style={textStyle}>
        <p>{textShown}</p>
      </div>
      {children.split(/(?<![,])(?= )/).length > 8 ? (
        <button onClick={() => setIsOpen((prev) => !prev)} style={buttonStyle}>
          {isOpen ? collapseButtonText : expandButtonText}
        </button>
      ) : (
        setIsOpen(true)
      )}
    </div>
  );
};

export default TextExpander;
