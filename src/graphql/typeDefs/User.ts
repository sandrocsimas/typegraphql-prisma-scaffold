import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class User {
  @Field()
  public id!: string;

  @Field()
  public firstName!: string;

  @Field()
  public lastName!: string;

  @Field()
  public username!: string;

  @Field()
  public createdAt!: Date;
}
