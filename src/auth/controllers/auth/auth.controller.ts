import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { LocalAuthGuard } from 'src/auth/guards';
import { User } from 'src/user/models';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('signin')
    public signin(@Request() req):  Observable<any>{
        return of(
            this.authService.generateJwt(req.user as User));
    }
}
