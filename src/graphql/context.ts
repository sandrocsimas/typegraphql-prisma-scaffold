import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import { Request } from 'express-jwt';

export interface AuthInfo {
  id: string;
  email: string;
}

export interface Context {
  auth: AuthInfo | null;
}

export const buildContext = async (expressContext: ExpressContextFunctionArgument): Promise<Context> => {
  const { auth } = expressContext.req as Request;
  return {
    auth: auth ? { id: auth.id, email: auth.email } : null,
  };
};
