import { PrismaClient, User } from '@prisma/client';
import { Service } from 'typedi';

import { PostWithAuthor } from './types/PostWithAuthor';

@Service()
class PostService {
  public constructor(private prisma: PrismaClient) {}

  public create(user: User, text: string): Promise<PostWithAuthor> {
    return this.prisma.post.create({
      data: {
        authorId: user.id,
        text,
      },
      include: { author: true },
    });
  }

  public getById(id: string): Promise<PostWithAuthor> {
    return this.prisma.post.findFirstOrThrow({
      where: { id },
      include: { author: true },
    });
  }

  public list(): Promise<PostWithAuthor[]> {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    });
  }
}

export default PostService;
