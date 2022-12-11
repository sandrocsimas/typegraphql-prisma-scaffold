import { Field, InputType } from 'type-graphql';

@InputType()
export default class CreatePostInput {
  @Field()
  public text!: string;
}
