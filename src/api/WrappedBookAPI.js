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

const removeDuplicateBooks = (books) => {
  // need this because sometimes back-end returns same book twice
  // (if it is already added to a shelf)
  const validShelves = ['currentlyReading', 'wantToRead', 'read'];
  const existingBooks = books.filter(book => {
    return validShelves.indexOf(book.shelf) > -1;
  });
  const nonExistingBooks = books.filter(book => {
    return !existingBooks.find(existingBook => existingBook.id === book.id);
  });
  return existingBooks.concat(nonExistingBooks);
};

const doubleCheckAgainstGetAllAPI = (books) => {
  // Bug: backend is not updating 'shelf' on search results
  const existingBooksMap = {};
  return BooksAPI.getAll()
    .then(existingBooks => {
      existingBooks.forEach(book => {
        existingBooksMap[book.id] = book.shelf;
      });
    })
    .then(() => {
      return books.map(book => {
        const shelf = existingBooksMap[book.id];
        return shelf ? { ...book, shelf } : book;
      });
    });
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
  return BooksAPI.search(query, maxResults).then(res => {
    if (res.error) {
      return Promise.reject(new Error(res.error));
    } else {
      const books = Array.isArray(res) ? res : [];
      // return removeDuplicateBooks(books.map(book => transformBookData(book)));
      return doubleCheckAgainstGetAllAPI(
        removeDuplicateBooks(books.map(book => transformBookData(book)))
      );
    }
  });
};

export default { get, getAll, update, search };
