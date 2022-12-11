import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Service } from 'typedi';

import { PostService, UserService } from '../../services';
import { Context } from '../context';
import { CreatePostInput, Post } from '../typeDefs';

import getAuthInfo from './helpers';

@Service()
@Resolver(Post)
class PostResolver {
  public constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  @Authorized()
  @Query(() => Post)
  public async post(@Arg('id') id: string): Promise<Post> {
    return this.postService.getById(id);
  }

  @Authorized()
  @Query(() => [Post])
  public async posts(): Promise<Post[]> {
    return this.postService.list();
  }

  @Authorized()
  @Mutation(() => Post)
  public async createPost(@Arg('input') input: CreatePostInput, @Ctx() ctx: Context): Promise<Post> {
    const authInfo = getAuthInfo(ctx);
    const user = await this.userService.getById(authInfo.id);
    return this.postService.create(user, input.text);
  }
}

export default PostResolver;
