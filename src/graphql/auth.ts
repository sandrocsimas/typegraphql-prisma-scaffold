import { AuthCheckerInterface, ResolverData } from 'type-graphql';
import { Service } from 'typedi';

import { Context } from '../ContextProvider';

@Service()
export default class AuthChecker implements AuthCheckerInterface<Context> {
  public check(resolverData: ResolverData<Context>, roles: string[]): boolean {
    return !!resolverData.context.user && roles.length === 0;
  }
}
