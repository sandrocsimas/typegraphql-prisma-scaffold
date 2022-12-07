import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import config from './config';
import buildSchema from './graphql/schema';

const startApp = async (): Promise<void> => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema(),
  });
  await apolloServer.start();

  app.use(cors(), bodyParser.json());
  apolloServer.applyMiddleware({ app });

  app.listen(config.port, () => {
    console.log(`🚀 GraphQL server running at port ${config.port} 🚀`);
  });
};

startApp();
