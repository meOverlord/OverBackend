import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { hash } from 'bcrypt';
import { InjectModel } from 'nestjs-typegoose';
import { from, Observable, throwError } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { AppException } from 'src/exceptions';
import { CreateUserInput } from 'src/user/dto';
import { CreateUserException, UserCreationErrorCodes } from 'src/user/exceptions';
import { User } from 'src/user/models';


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

        return from(hash(password, 10))
            .pipe(
                mergeMap((hash) => {
                    const createdUser = new this.userModel(
                        {
                            name,
                            email : email.toLowerCase(),
                            password: hash
                        });
                    return (createdUser.save() as Promise<User>)
                })
            );
    }

    public findByIdent(ident: string): Observable<User>{
        return from(this.userModel.findOne({
            $or: [
                {'nameLower' : ident.toLowerCase()},
                {'email' : ident.toLowerCase()},
            ]
        }).exec() as Promise<User>);
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
