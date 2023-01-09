import { User } from '@prisma/client';

import { Context } from '../../ContextProvider';

const getAuthenticatedUser = (ctx: Context): User => {
  if (!ctx.user) {
    throw new Error('Not authrorized');
  }
  return ctx.user;
};

export default getAuthenticatedUser;
