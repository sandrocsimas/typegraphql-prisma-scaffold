import { User } from '@prisma/client';

import prisma from '../database';

class UserService {
  public createUser(email: string, firstName: string, lastName: string): Promise<User> {
    return prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
      },
    });
  }

  public getUserById(id: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { id } });
  }
}

export default new UserService();
