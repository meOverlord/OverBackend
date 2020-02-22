import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/services/user/user.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

    constructor(private userService: UserService){
        
    }

    public validateUser(ident: string, password: string): Observable<boolean>{
        return this.userService.findByIdent(ident)
            .pipe(
                map(user => user?.password === password)
            );
    }

}
