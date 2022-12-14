import { GraphQLSchema } from 'graphql';
import * as typeGraphql from 'type-graphql';
import { Container } from 'typedi';

import AuthChecker from './auth';
import PostResolver from './resolvers/PostResolver';
import UserResolver from './resolvers/UserResolver';

const buildSchema = async (): Promise<GraphQLSchema> => typeGraphql.buildSchema({
  authChecker: AuthChecker,
  container: Container,
  resolvers: [
    PostResolver,
    UserResolver,
  ],
  validate: { forbidUnknownValues: false },
});

export default buildSchema;
