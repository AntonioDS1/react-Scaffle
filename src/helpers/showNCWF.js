export const showNCWF = (text, showNotCollapsedWords) => {
  const split = text.split(/(?<![,])(?= )/);
  return `${split.slice(0, showNotCollapsedWords).join('')}${split.length < showNotCollapsedWords + 1 ? '' : '...'}`;
};
