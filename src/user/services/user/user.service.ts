import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Observable, throwError, of, from } from 'rxjs';
import { CreateUserInput } from 'src/user/dto';
import { CreateUserException, UserCreationErrorCodes } from 'src/user/exceptions';
import { tap } from 'rxjs/operators';
import { AppException } from 'src/exceptions';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
    ) {}

    public create({name, email, password}: CreateUserInput): Observable<User> {
        const error: AppException = this.controlUserCreation({name, email, password});
        if(error){
            return throwError(error);
        }
        const createdUser = new this.userModel({name, email, password});
        return from(createdUser.save() as Promise<User>).pipe(
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


    private controlUserCreation({name, email, password}: CreateUserInput): AppException{
        const errors = [];
        
        if(!name){errors.push(UserCreationErrorCodes.MISSING_USERNAME)}
        if(!email){errors.push(UserCreationErrorCodes.MISSING_EMAIL)}
        if(!password){errors.push(UserCreationErrorCodes.MISSING_PASSWORD)}

        if(errors.length > 0){
            return new CreateUserException(errors);
        }
        if(password.length < 8){
            return new CreateUserException(UserCreationErrorCodes.WEAK_PASSWORD);
        }
        return null;
    }
}
