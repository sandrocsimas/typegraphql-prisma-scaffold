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

import config from '../../config';
import { UserService } from '../../services';
import { Context } from '../context';
import {
  SignInInput,
  SignUpInput,
  User,
  UserAndTokenOutput,
} from '../typeDefs';

import getAuthInfo from './helpers';

@Service()
@Resolver(User)
class UserResolver {
  public constructor(private userService: UserService) {}

  @Authorized()
  @Query(() => User)
  public async user(@Arg('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Authorized()
  @Query(() => User)
  public async me(@Ctx() ctx: Context): Promise<User> {
    const authInfo = getAuthInfo(ctx);
    return this.userService.getById(authInfo.id);
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
