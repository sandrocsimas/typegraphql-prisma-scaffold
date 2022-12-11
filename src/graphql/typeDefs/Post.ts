import { Field, ObjectType } from 'type-graphql';

import User from './User';

@ObjectType()
export default class Post {
  @Field()
  public id!: string;

  @Field()
  public text!: string;

  @Field()
  public author!: User;

  @Field()
  public authorId!: string;

  @Field()
  public createdAt!: Date;
}
