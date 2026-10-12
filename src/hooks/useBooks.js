import { useFetch } from './useFetch';

export const useBooks = (query) => {
  const FIELDS = [
    'key',
    'title',
    'author_name',
    'cover_i',
    'first_publish_year',
    'number_of_pages_median',
    'subject',
  ].join(',');
  const isValid = query.trim().length >= 3;
  const {
    data: books,
    isLoading,
    error,
  } = useFetch(
    isValid
      ? `https://openlibrary.org/search.json?q=${encodeURIComponent(query.trim())}&fields=${FIELDS}`
      : null,
  );
  return {
    books: books?.docs ?? [],
    isLoading,
    error,
  };
};
