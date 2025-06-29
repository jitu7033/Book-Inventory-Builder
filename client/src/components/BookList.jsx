import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {books.map(book => (
      <BookCard key={book._id} book={book} />
    ))}
  </div>
);

export default BookList;
