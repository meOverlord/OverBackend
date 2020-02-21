import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Observable, throwError } from 'rxjs';
import { CreateUserInput } from 'src/user/dto';
import { CreateUserException } from 'src/user/exceptions';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
    ) {}

    public create({name, email}: CreateUserInput): Observable<User> {
        console.log(name, email);
        if(!name && !email){
            return throwError(new CreateUserException());
        }
        const createdUser = new this.userModel({name, email});
        return createdUser.save().toObservable().pipe(
            tap(response => console.log(response))
        );
    }

    public findByIdent(ident: string): Observable<User>{
        return this.userModel.find({
            $or: [
                {'name' : ident},
                {'email' : ident},
            ]
        }).exec().toObservable();
    }

}
