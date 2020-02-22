import { Injectable } from '@nestjs/common';
import { Observable, from, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { compare } from 'bcrypt';

import { UserService } from 'src/user/services/user/user.service';
import { User } from 'src/user/models';
import { AuthCredentialException } from 'src/auth/expcetions';

@Injectable()
export class AuthService {

    constructor(private userService: UserService){
        
    }

    public validateUser(ident: string, password: string): Observable<User>{
        return this.userService.findByIdent(ident)
            .pipe(
                mergeMap(user => from(compare(password, user?.password))
                    .pipe(
                        map(v => {
                            if(!v){
                                throw new AuthCredentialException();
                            }
                            return user; 
                        })
                    )
                ),
                catchError(err => throwError(new AuthCredentialException()))
            );
    }

}
