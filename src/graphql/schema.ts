import { GraphQLScalarType, GraphQLSchema } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';
import * as typeGraphql from 'type-graphql';

import UserResolver from './resolvers';

const buildSchema = async (): Promise<GraphQLSchema> => typeGraphql.buildSchema({
  resolvers: [UserResolver],
  scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
});

export default buildSchema;
