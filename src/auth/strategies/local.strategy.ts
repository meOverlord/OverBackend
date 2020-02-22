import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/user/models";
import { AuthUnauthorizedException } from "../exceptions";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate(ident: string, password: string): Observable<User> {
    console.log('Local strategy', ident, password);
    return this.authService.validateUser(ident, password)
        .pipe(
        map(user => {
            if(!user){
                throw new AuthUnauthorizedException();
            }
            return user;
        })
    );
  }
}