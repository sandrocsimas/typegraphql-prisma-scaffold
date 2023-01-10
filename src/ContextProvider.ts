import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import { User } from '@prisma/client';
import { Request } from 'express-jwt';
import { Service } from 'typedi';

import { UserService } from './services/init';

export interface AuthInfo {
  id: string;
  email: string;
}

export interface Context {
  user: User | null;
}

@Service()
export class ContextProvider {
  public constructor(
    private userService: UserService,
  ) {}

  public async buildContext(expressContext: ExpressContextFunctionArgument): Promise<Context> {
    const { auth } = expressContext.req as Request;
    return {
      user: auth ? await this.userService.get(auth.id) : null,
    };
  }
}
