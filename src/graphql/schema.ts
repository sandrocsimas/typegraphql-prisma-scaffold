import { GraphQLSchema } from 'graphql';
import * as typeGraphql from 'type-graphql';
import { Container } from 'typedi';

import AuthChecker from './auth';
import {
  PostResolver,
  UserResolver,
} from './resolvers';

const buildSchema = async (): Promise<GraphQLSchema> => typeGraphql.buildSchema({
  authChecker: AuthChecker,
  container: Container,
  resolvers: [
    PostResolver,
    UserResolver,
  ],
});

export default buildSchema;
