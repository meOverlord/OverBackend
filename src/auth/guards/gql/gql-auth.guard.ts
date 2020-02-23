import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  /*handleRequest<TUser = any>(err, user, info, context, status?): TUser {
		console.error('err', err);
		console.log('user', user);
		console.log('info', info)
		if (err || !user) {
			throw err || new UnauthorizedException();
		}
		return user;
	}*/

  getRequest(context: ExecutionContext) {
	const ctx = GqlExecutionContext.create(context);
	return ctx.getContext().req;
  }
}
