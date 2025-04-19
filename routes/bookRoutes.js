const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController'); // Import the specific middleware
const { verifyToken, isAdmin } = require('../middleware/authMiddleware'); // Import the specific middleware

// Get all books
router.get('/', getAllBooks);

// Get a book by ID
router.get('/:id', verifyToken, isAdmin, getBookById);

// Create a new book (admin only)
router.post('/', isAdmin, createBook);

// Update a book by ID (admin only)
router.put('/:id', verifyToken, isAdmin, updateBook);

// Delete a book by ID (admin only)
router.delete('/:id', isAdmin, deleteBook);

module.exports = router;
