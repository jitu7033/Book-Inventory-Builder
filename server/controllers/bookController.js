const Book = require('../models/Book.js');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

exports.createBook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const imagePath = req.file.path;
    const imageBase64 = fs.readFileSync(imagePath, 'base64');
    const ext = path.extname(imagePath).toLowerCase();
    const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';

    // Initial prompt to Gemini Vision (image-based)
    const visionPrompt = `
From this book cover image, extract as much information as you can:
- Title
- cover image
- Author
- Grade Level (if shown)
- Subject
- Series
- Price

If a field is not readable, write "Not available". Format like:
Title: ...
Cover Image: (inline image)
Author: ...
Grade: ...
Subject: ...
Series: ...
Price: ...
    `;

    const visionRes = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
      {
        contents: [
          {
            parts: [
              { text: visionPrompt },
              {
                inlineData: {
                  mimeType,
                  data: imageBase64
                }
              }
            ]
          }
        ]
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const visionText = visionRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const extracted = parseGeminiText(visionText);

    console.log('Extracted data:', extracted);

    // Determine missing fields
    const missingFields = Object.entries(extracted)
      .filter(([key, value]) => key !== 'title' && (!value || value.toLowerCase().includes('not available')))
      .map(([key]) => key);

    // If title exists, do a follow-up with Gemini using only text
    if (extracted.title && missingFields.length > 0) {
      const proPrompt = `
Given the book titled "${extracted.title}, (extracted.author ? extracted.author : '')${extracted.grade ? `, for grade ${extracted.grade}` : ''}${extracted.subject ? `, subject: ${extracted.subject}` : ''}${extracted.series ? `, part of the series: ${extracted.series}` : ''}${extracted.price ? `, priced at ${extracted.price}` : ''}${missingFields.length > 0 ? `, please provide the following missing details:` : ''}${missingFields.length > 0 ? missingFields.map(f => `\n- ${capitalize(f)}`).join('') : ''}", provide the following missing details:
${missingFields.map(f => `${capitalize(f)}:`).join('\n')}

Do not write "Unknown" or "Not available". Guess based on common data if needed.
      `;

      const proRes = await axios.post(
        'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
        {
          contents: [
            {
              parts: [{ text: proPrompt }]
            }
          ]
        },
        {
          params: { key: process.env.GEMINI_API_KEY },
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const proText = proRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const completed = parseGeminiText(proText);

      for (const field of missingFields) {
        if (completed[field] && !completed[field].toLowerCase().includes('not available')) {
          extracted[field] = completed[field];
        }
      }
    }

    const book = new Book({
      ...extracted,
      imagePath
    });

    // await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error('AI extraction failed:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Failed to extract book data.' });
  }
};

// Utility functions
function parseGeminiText(text) {
  const lines = text.split('\n');
  const obj = { title: '', author: '', grade: '', subject: '', series: '', price: '' };

  lines.forEach(line => {
    const [keyRaw, valRaw] = line.split(':');
    if (!keyRaw || !valRaw) return;

    const key = keyRaw.toLowerCase().trim();
    const val = valRaw.trim();

    if (key.includes('title')) obj.title = val;
    else if (key.includes('author')) obj.author = val;
    else if (key.includes('grade')) obj.grade = val;
    else if (key.includes('subject')) obj.subject = val;
    else if (key.includes('series')) obj.series = val;
    else if (key.includes('price')) obj.price = val;
  });

  return obj;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

exports.saveBook = async (req, res) => {
  try {
    const { title, author, grade, subject, series, price, imagePath } = req.body;
    console.log('Saving book with data:', {
      title, author, grade, subject, series, price, imagePath
    });

    const book = new Book({
      title,
      author,
      grade,
      subject,
      series,
      price,
      imagePath
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error('Save error:', err.message);
    res.status(500).json({ error: 'Failed to save book.' });
  }
};

exports