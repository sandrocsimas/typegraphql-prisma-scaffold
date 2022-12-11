import { Field, ObjectType } from 'type-graphql';

import User from '../User';

@ObjectType()
export default class UserAndTokenOutput {
  @Field()
  public user!: User;

  @Field()
  public token!: string;
}
