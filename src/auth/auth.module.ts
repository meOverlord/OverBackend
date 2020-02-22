import { Module, Global } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [PassportModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
