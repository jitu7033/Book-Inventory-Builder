import React from 'react';
const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <img
        src={`http://localhost:5000/${book.imagePath}`}
        alt={book.title}
        className="w-full h-56 object-cover rounded mb-4"
      />
      <h2 className="text-lg font-bold text-gray-800 mb-2">{book.title}</h2>
      <div className="text-sm text-gray-700 space-y-1">
        <p><span className="font-semibold">Author:</span> {book.author}</p>
        <p><span className="font-semibold">Grade Level:</span> {book.grade}</p>
        <p><span className="font-semibold">Subject:</span> {book.subject}</p>
        <p><span className="font-semibold">Series:</span> {book.series}</p>
        <p><span className="font-semibold">Price:</span> {book.price}</p>
      </div>
      <p className="text-xs text-gray-400 mt-3">Added on: {new Date(book.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default BookCard;

