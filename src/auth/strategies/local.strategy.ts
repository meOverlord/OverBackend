import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { map, catchError } from "rxjs/operators";
import { User } from "src/user/models";
import { AuthUnauthorizedException } from "../exceptions";
import { AuthService } from "../services/auth/auth.service";
import { Observable, throwError } from "rxjs";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService) {
    super({
      passReqToCallback: true,
      usernameField: 'ident'
    });
  }

  async validate(req: any, ident: string, password: string): Promise<User> {
    return this.authService.validateUser(ident, password)
        .pipe(
        map(user => {
            if(!user){
                throw new AuthUnauthorizedException();
            }
            return user;
        })
    ).toPromise();
  }
}