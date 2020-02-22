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

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    public signin(@Request() req):  Observable<any>{
        console.log(req.user);
        const user = req.user as User;
        return of(
            this.authService.generateJwt({_id: user._id, name: user.name}));
    }
}
