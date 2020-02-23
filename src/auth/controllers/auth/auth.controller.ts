import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalAuthGuard } from 'src/auth/guards';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { User } from 'src/user/models';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    public signin(@Request() req):  Observable<any>{
        const user = req.user as User;
        return of(
            this.authService.generateJwt({_id: user._id, name: user.name}));
    }
}
