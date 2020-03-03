import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
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
        private jwtService: JwtService,
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
            access_token: this.jwtService.sign({
                name,
                sub: _id
            }),
        }
    }
}
