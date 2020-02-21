import { Mutation, Resolver } from '@nestjs/graphql';
import { Args } from 'type-graphql';
import { CreateUserInput } from '../dto';
import { User } from '../models';
import { UserService } from '../services/user/user.service';
import { Observable } from 'rxjs';



@Resolver(of => User)
export class CreateUserResolver {

    constructor(
        private userServise: UserService){}


  @Mutation(returns => User)
  public createUser(@Args() {name, email}: CreateUserInput): Observable<User>{
    console.log(name, email);
    return this.userServise.create({name, email});
  }
}
