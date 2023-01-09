import {
  PrismaClient,
  User,
} from '@prisma/client';
import { Service } from 'typedi';

import { PostWithAuthor } from './types/PostWithAuthor';

@Service()
class PostService {
  public constructor(private prisma: PrismaClient) {}

  public get(id: string): Promise<PostWithAuthor> {
    return this.prisma.post.findFirstOrThrow({
      where: { id },
      include: { author: true },
    });
  }

  public async create(user: User, text: string): Promise<PostWithAuthor> {
    return this.prisma.post.create({
      data: {
        text,
        authorId: user.id,
      },
      include: { author: true },
    });
  }

  public async remove(user: User, postId: string): Promise<boolean> {
    const post = await this.get(postId);
    if (post.authorId !== user.id) {
      throw Error('Post does not belong to user');
    }
    await this.prisma.post.delete({
      where: { id: postId },
    });
    return true;
  }

  public async list(): Promise<PostWithAuthor[]> {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    });
  }
}

export default PostService;
