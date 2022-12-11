import { AuthCheckerInterface, ResolverData } from 'type-graphql';
import { Service } from 'typedi';

import { Context } from './context';

@Service()
export default class AuthChecker implements AuthCheckerInterface<Context> {
  public check(resolverData: ResolverData<Context>, roles: string[]): boolean {
    return !!resolverData.context.auth && roles.length === 0;
  }
}
