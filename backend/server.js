require('./tracing');      // Initializes tracing first
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3050;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String
});

const Book = mongoose.model('Book', bookSchema);

app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post('/api/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

app.delete('/api/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});