import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { Observable, from, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { compare } from 'bcrypt';

import { UserService } from 'src/user/services/user/user.service';
import { User } from 'src/user/models';
import { AuthCredentialException, AuthUnauthorizedException } from 'src/auth/exceptions';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG_KEYS } from 'src/config';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private config: ConfigService){
        
    }

    public validateUser(ident: string, password: string): Observable<User>{
        return this.userService.findByIdent(ident)
            .pipe(
                mergeMap(user => from(compare(password, user?.password))
                    .pipe(
                        map(v => {
                            if(!v){
                                throw new AuthUnauthorizedException();
                            }
                            return user; 
                        })
                    )
                ),
                catchError(err => throwError(new AuthCredentialException()))
            );
    }

    public generateJwt({_id, name}){
        return {
            access_token: sign({
                name,
                sub: _id
            },
            this.config.get(JWT_CONFIG_KEYS.SECRET),
            {
                algorithm: 'RS256',
                expiresIn: '1h'
            }),
        }
    }
}
