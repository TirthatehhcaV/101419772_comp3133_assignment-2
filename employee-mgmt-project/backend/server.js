require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('@apollo/server-plugin-landing-page-graphql-playground');

const connectDB = require('./config/db');
const schema = require('./graphql/schema');
const authMiddleware = require('./middleware/authMiddleware');

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Apollo Server Setup
const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()  // 👈 Add this line
  ]
});

async function startServer() {
  await apolloServer.start();

  app.use(
    '/graphql',
    authMiddleware,
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({
        verifiedUser: req.verifiedUser,
      }),
    })
  );

  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
}

startServer();

module.exports = app;
