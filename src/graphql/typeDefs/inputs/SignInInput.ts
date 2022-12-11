import { Field, InputType } from 'type-graphql';

@InputType()
export default class SignInInput {
  @Field()
  public email!: string;

  @Field()
  public password!: string;
}
