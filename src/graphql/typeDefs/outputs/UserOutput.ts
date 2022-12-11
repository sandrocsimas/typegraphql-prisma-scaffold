import { Field, ObjectType } from 'type-graphql';

import User from '../User';

@ObjectType()
export default class UserOutput {
  @Field()
  public user!: User;
}
