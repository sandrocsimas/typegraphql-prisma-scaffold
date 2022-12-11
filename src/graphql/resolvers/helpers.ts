import { AuthInfo, Context } from '../context';

const getAuthInfo = (ctx: Context): AuthInfo => {
  if (!ctx.auth) {
    throw new Error('Not authrorized');
  }
  return ctx.auth;
};

export default getAuthInfo;
