import { Field, InputType } from 'type-graphql';

@InputType()
export default class SignUpInput {
  @Field()
  public firstName!: string;

  @Field()
  public lastName!: string;

  @Field()
  public email!: string;

  @Field()
  public password!: string;
}
