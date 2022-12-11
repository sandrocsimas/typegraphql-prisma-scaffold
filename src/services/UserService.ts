import { PrismaClient, User } from '@prisma/client';
import { Service } from 'typedi';

@Service()
class UserService {
  public constructor(private prisma: PrismaClient) {}

  public create(firstName: string, lastName: string, username: string, email: string, password: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
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

  public getById(id: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }
}

export default UserService;
