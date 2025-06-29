const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const bookRoutes = require('./routes/bookRoutes');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/books', bookRoutes);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
});

