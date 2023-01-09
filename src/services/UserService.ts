import { PrismaClient, User } from '@prisma/client';
import { Service } from 'typedi';

@Service()
class UserService {
  public constructor(
    private prisma: PrismaClient,
  ) {}

  public get(id: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  public create(firstName: string, lastName: string, email: string, password: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
  }

  public async authenticate(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { email } });
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    return user;
  }
}

export default UserService;
