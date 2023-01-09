import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class User {
  @Field()
  public id!: string;

  @Field()
  public firstName!: string;

  @Field()
  public lastName!: string;

  @Field(() => String, { nullable: true })
  public username?: string | null;

  @Field()
  public createdAt!: Date;
}
