const Book = require('../models/Book');
const axios = require('axios');

// ✅ Admin: Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Admin: Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Admin: Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, price, stock, description, image } = req.body;

    // Validate required fields
    if (!title || !price) {
      return res.status(400).json({ message: 'Title and price are required.' });
    }

    let coverUrl = image;

    // If no image provided, attempt to fetch from Open Library
    if (!coverUrl) {
      const olRes = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
      const coverId = olRes.data.docs[0]?.cover_i;
      if (coverId) {
        coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
      }
    }

    const newBook = new Book({ title, author, price, stock, description, image: coverUrl });
    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Admin: Update a book
exports.updateBook = async (req, res) => {
  try {
    const { title, price } = req.body;

    // Validate required fields if they are being updated
    if (title === '' || price === '') {
      return res.status(400).json({ message: 'Title and price cannot be empty.' });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true // Ensure Mongoose runs validation on update
    });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Admin: Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
