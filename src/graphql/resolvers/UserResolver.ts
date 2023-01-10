import jwt from 'jsonwebtoken';
import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Service } from 'typedi';

import Config from '../../Config';
import { Context } from '../../ContextProvider';
import UserService from '../../services/UserService';
import User from '../typeDefs/User';
import SignInInput from '../typeDefs/inputs/SignInInput';
import SignUpInput from '../typeDefs/inputs/SignUpInput';
import UserAndTokenOutput from '../typeDefs/outputs/UserAndTokenOutput';

import getAuthenticatedUser from './helpers';

@Service()
@Resolver(User)
class UserResolver {
  public constructor(
    private config: Config,
    private userService: UserService,
  ) {}

  @Authorized()
  @Query(() => User)
  public async user(@Arg('id') id: string): Promise<User> {
    return this.userService.get(id);
  }

  @Authorized()
  @Query(() => User)
  public async me(@Ctx() ctx: Context): Promise<User> {
    const user = getAuthenticatedUser(ctx);
    return this.userService.get(user.id);
  }

  @Mutation(() => UserAndTokenOutput)
  public async signUp(@Arg('input') input: SignUpInput): Promise<UserAndTokenOutput> {
    const user = await this.userService.create(input.firstName, input.lastName, input.email, input.password);
    const token = jwt.sign({ id: user.id, email: user.email }, this.config.jwtSecret);
    return {
      user,
      token,
    };
  }

  @Mutation(() => UserAndTokenOutput)
  public async signIn(@Arg('input') input: SignInInput): Promise<UserAndTokenOutput> {
    const user = await this.userService.authenticate(input.email, input.password);
    const token = jwt.sign({ id: user.id, email: user.email }, this.config.jwtSecret);
    return {
      user,
      token,
    };
  }
}

export default UserResolver;
