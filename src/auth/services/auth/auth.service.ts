import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/services/user/user.service';

@Injectable()
export class AuthService {

    constructor(userService: UserService){
        
    }

    public validateUser(ident: string, password: string): Observable<any>{
        return null;
    }

}
