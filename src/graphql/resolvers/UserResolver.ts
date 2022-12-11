import jwt from 'jsonwebtoken';
import {
  Arg,
  Authorized,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Service } from 'typedi';

import config from '../../config';
import { UserService } from '../../services';
import {
  SignInInput,
  SignUpInput,
  User,
  UserAndTokenOutput,
} from '../typeDefs';

@Service()
@Resolver(User)
class UserResolver {
  public constructor(private userService: UserService) {}

  @Authorized()
  @Query(() => User)
  public async user(@Arg('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Mutation(() => UserAndTokenOutput)
  public async signUp(@Arg('input') input: SignUpInput): Promise<UserAndTokenOutput> {
    const user = await this.userService.create(input.firstName, input.lastName, input.username, input.email, input.password);
    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  @Mutation(() => UserAndTokenOutput)
  public async signIn(@Arg('input') input: SignInInput): Promise<UserAndTokenOutput> {
    const user = await this.userService.authenticate(input.email, input.password);
    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret);
    return {
      user,
      token,
    };
  }
}

export default UserResolver;
