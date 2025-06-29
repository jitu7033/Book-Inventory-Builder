import React, { useState, useEffect } from 'react';
import UploadForm from './components/UploadForm';
import BookList from './components/BookList';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books');
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📚 Book Inventory Builder</h1>
      <UploadForm onUploadSuccess={fetchBooks} />
      <BookList books={books} />
    </div>
  );
};

export default App;
