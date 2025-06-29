const express = require('express');
const multer = require('multer');
const path = require('path');
const { createBook, getBooks, updateBook, saveBook } = require('../controllers/bookController');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), createBook);
router.get('/', getBooks);
router.put('/:id', updateBook);
router.post('/save',saveBook)

module.exports = router;
