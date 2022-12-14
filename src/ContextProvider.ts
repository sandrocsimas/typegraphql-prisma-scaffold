import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import { User } from '@prisma/client';
import { Request } from 'express-jwt';
import { Service } from 'typedi';

import UserService from './services/UserService';

export interface AuthInfo {
  id: string;
  email: string;
}

export interface Context {
  user: User | null;
}

@Service()
export class ContextProvider {
  public constructor(private userService: UserService) {}

  public async buildContext(expressContext: ExpressContextFunctionArgument): Promise<Context> {
    const { auth } = expressContext.req as Request;
    try {
      const user = auth ? await this.userService.get(auth.id) : null;
      return { user };
    } catch (err) {
      console.log('Failed to create context:');
      console.log(err);
      return { user: null };
    }
  }
}
