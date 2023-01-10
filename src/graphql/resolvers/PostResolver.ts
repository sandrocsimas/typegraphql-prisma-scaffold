import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Service } from 'typedi';

import { Context } from '../../ContextProvider';
import PostService from '../../services/PostService';
import Post from '../typeDefs/Post';
import CreatePostInput from '../typeDefs/inputs/CreatePostInput';

import getAuthenticatedUser from './helpers';

@Service()
@Resolver(Post)
class PostResolver {
  public constructor(private postService: PostService) {}

  @Authorized()
  @Query(() => Post)
  public async post(@Arg('id') id: string): Promise<Post> {
    return this.postService.get(id);
  }

  @Authorized()
  @Query(() => [Post])
  public async posts(): Promise<Post[]> {
    return this.postService.list();
  }

  @Authorized()
  @Mutation(() => Post)
  public async createPost(@Arg('input') input: CreatePostInput, @Ctx() ctx: Context): Promise<Post> {
    const user = getAuthenticatedUser(ctx);
    return this.postService.create(user, input.text);
  }

  @Authorized()
  @Mutation(() => Boolean)
  public async removePost(@Arg('postId') postId: string, @Ctx() ctx: Context): Promise<boolean> {
    const user = getAuthenticatedUser(ctx);
    return this.postService.remove(user, postId);
  }
}

export default PostResolver;
