import BooksAPI from './BooksAPI';

const transformBookData = (data) => {
  return {
    id: data.id,
    title: data.title,
    authors: data.authors,
    shelf: data.shelf,
    backgroundImageURL: data.imageLinks.thumbnail
  };
};

const get = (bookId) => {
  return BooksAPI.get(bookId).then(book => transformBookData(book));
};

const getAll = () => {
  const shelves = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };
  return BooksAPI.getAll().then(books => {
    books.forEach(book => {
      shelves[book.shelf].push(transformBookData(book));
    });
    return shelves;
  });
};

const update = (bookId, shelf) => {
  return BooksAPI.update({ id: bookId }, shelf);
};

const search = (query, maxResults) => {
  return BooksAPI.search(query, maxResults).then(books => {
    return books.map(book => transformBookData(book));
  });
};

export default { get, getAll, update, search };
