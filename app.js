const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://kind-moss-06ab0cf0f.6.azurestaticapps.net'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

const { verifyToken } = require('./middleware/authMiddleware'); // Import specific middleware

// Load routes
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const bookRoutes = require('./routes/bookRoutes');
const orderRoutes = require('./routes/orderRoutes');
const settingsRoutes = require('./routes/settingsRoutes'); // Import settings routes
const analyticsRoutes = require('./routes/analyticsRoutes'); // Import analytics routes
const paymentRoutes = require('./routes/paymentRoutes'); // Import payment routes
const userRoutes = require('./routes/userRoutes'); // Import user routes
const aiRoutes = require('./routes/aiRoutes'); // Import AI routes

// Debug logs
console.log('authRoutes:', authRoutes);
console.log('customerRoutes:', customerRoutes);
console.log('bookRoutes:', bookRoutes);
console.log('orderRoutes:', orderRoutes);
console.log('settingsRoutes:', settingsRoutes);
console.log('verifyToken:', verifyToken);

// 👇 Public routes
app.use('/api/auth', authRoutes);

// 👇 Protect all other /api routes
app.use('/api', verifyToken); // Use the specific middleware function

// 👇 Protected routes
app.use('/api/customers', customerRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingsRoutes); // Register settings routes
app.use('/api/analytics', analyticsRoutes); // Register analytics routes
app.use('/api/payment', paymentRoutes); // Register payment routes
app.use('/api/users', userRoutes); // Register user routes
app.use('/api/ai', aiRoutes); // Register AI routes

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({ req }),
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );
}

startApolloServer();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
