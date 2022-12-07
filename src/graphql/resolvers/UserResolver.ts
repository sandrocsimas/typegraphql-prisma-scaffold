import {
  User,
  UserCreateInput,
} from '@generated/type-graphql';
import {
  Arg,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';

import userService from '../../services/UserService';

@Resolver(User)
class UserResolver {
  @Query(() => User, { nullable: true })
  public async user(@Arg('id') id: string): Promise<User | null> {
    return userService.getUserById(id);
  }

  @Mutation(() => User)
  public async createUser(@Arg('input') input: UserCreateInput): Promise<User> {
    return userService.createUser(input.email, input.firstName, input.lastName);
  }
}

export default UserResolver;
