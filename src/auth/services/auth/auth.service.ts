import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthCredentialException, AuthUnauthorizedException } from 'src/auth/exceptions';
import { JWT_CONFIG_KEYS } from 'src/config';
import { User } from 'src/user/models';
import { UserService } from 'src/user/services/user/user.service';



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
                catchError(err => {
                    console.log('catched error', err);
                    return throwError(new AuthCredentialException())
                })
            );
    }

    public generateJwt({_id, name}){
        let secret: string = this.config.get(JWT_CONFIG_KEYS.SECRET);
        secret = secret.replace(/\\n/gi, '\n');
        console.log(_id, name);
        return {
            access_token: sign({
                name,
                sub: _id
            },
            secret,
            {
                algorithm: 'RS256',
                expiresIn: '1h'
            }),
        }
    }
}
