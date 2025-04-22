const Book = require('../models/Book');
const User = require('../models/User');
const Order = require('../models/Order');

const resolvers = {
  Query: {
    books: async () => {
        return await Book.find();
      },
    book: (_, { id }) => Book.findById(id),
    users: () => User.find(),
    user: (_, { id }) => User.findById(id),
    orders: () => Order.find(),
    order: (_, { id }) => Order.findById(id),
  },

  Mutation: {
    createBook: (_, { input }) =>
      Book.create({
        title: input.title,
        author: input.author,
        price: input.price,
        stock: input.stock,
        isbn: input.isbn
      }),

    updateBook: async (_, { id, stock }) => {
      const updated = await Book.findByIdAndUpdate(id, { stock }, { new: true });
      return updated;
    },

    deleteBook: async (_, { id }) => {
      await Book.findByIdAndDelete(id);
      return 'Book deleted successfully';
    },

    createUser: (_, { input }) =>
      User.create({ name: input.name, email: input.email }),

    updateUser: async (_, { id, name, email }) => {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true }
      );
      return updatedUser;
    },

    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return 'User deleted successfully';
    },

    createOrder: async (_, { input }) => {
      const { customerId, items } = input;
      let totalPrice = 0;
      const orderItems = [];

      for (const item of items) {
        const book = await Book.findById(item.bookId);
        if (!book) throw new Error(`Book not found: ${item.bookId}`);

        if (book.stock < item.quantity)
          throw new Error(`Insufficient stock for ${book.title}`);

        book.stock -= item.quantity;
        await book.save();

        totalPrice += book.price * item.quantity;

        orderItems.push({
          bookId: book._id,
          title: book.title,
          quantity: item.quantity,
          price: book.price
        });
      }

      const order = await Order.create({
        customerId,
        items: orderItems,
        totalPrice
      });

      return order;
    },

    deleteOrder: async (_, { orderId }) => {
      await Order.findByIdAndDelete(orderId);
      return 'Order deleted successfully';
    },

    updateOrderStatus: async (_, { orderId, status }) => {
      return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    }
  }
};

module.exports = resolvers;