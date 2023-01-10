import 'reflect-metadata';
import './services/init';

import http from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { expressjwt } from 'express-jwt';
import Container from 'typedi';

import Config from './Config';
import { Context, ContextProvider } from './ContextProvider';
import buildSchema from './graphql/schema';

const startApp = async (): Promise<void> => {
  const config = Container.get(Config);
  const contextProvider = Container.get(ContextProvider);
  const app = express();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer<Context>({
    schema: await buildSchema(),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use(
    cors(),
    bodyParser.json(),
    expressjwt({
      algorithms: ['HS256'],
      credentialsRequired: false,
      secret: config.jwtSecret,
    }),
    expressMiddleware(apolloServer, {
      context: contextProvider.buildContext.bind(contextProvider),
    }),
  );

  httpServer.listen(config.port, () => {
    console.log(`🚀 GraphQL Server running at http://localhost:${config.port}/graphql 🚀`);
  });
};

startApp();
