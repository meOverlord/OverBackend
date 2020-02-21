import { Module, Global } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';

@Global()
@Module({
  providers: [AuthService]
})
export class AuthModule {}
