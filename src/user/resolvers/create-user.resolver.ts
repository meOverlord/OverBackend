import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { CreateUserInput } from '../dto';
import { User } from '../models';
import { UserService } from '../services/user/user.service';
import { Observable } from 'rxjs';



@Resolver(of => User)
export class CreateUserResolver {

    constructor(
        private userServise: UserService){}

  @Mutation(returns => User)
  public createUser(@Args('input')
  input: CreateUserInput): Observable<User>{
    return this.userServise.create(input);
  }
}
