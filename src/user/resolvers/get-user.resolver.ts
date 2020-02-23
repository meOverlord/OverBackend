import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards';
import { User } from '../models';
import { UserService } from '../services/user/user.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/strategies';
import { Observable } from 'rxjs';



@Resolver(of => User)
export class GetUserResolver {

    constructor(
        private userServise: UserService){}

    @Query(returns => User)
    @UseGuards(GqlAuthGuard)
    currentUser(@CurrentUser() payload: JwtPayload): Observable<User>{
        return this.userServise.findById(payload._id);
    }
}
