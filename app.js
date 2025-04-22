const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const { swaggerUi, swaggerSpec } = require('./swagger');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://kind-moss-06ab0cf0f.6.azurestaticapps.net',
  'https://studio.apollographql.com',
  'http://localhost:5001'
];

// Add before GraphQL and routes
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      if (process.env.NODE_ENV !== 'test') {
        console.warn(`🔒 Blocked by CORS: ${origin}`);
      }
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}));

// Handle preflight OPTIONS requests manually
app.options('*', cors());
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
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true, 
      playground: true,
      context: async ({ req }) => {
        return { req };
      },
    });

    await server.start();
    console.log('✅ Apollo Server started');

    app.use('/graphql', express.json(), expressMiddleware(server));

    console.log('🚀 GraphQL endpoint ready at /graphql');
  } catch (error) {
    console.error('❌ Failed to start Apollo Server:', error);
  }
}

startApolloServer();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;
