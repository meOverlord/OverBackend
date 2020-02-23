import { Module, Global } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { UserService } from './services/user/user.service';
import { User } from './models';
import { CreateUserResolver, GetUserResolver } from './resolvers';

@Global()
@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UserService, CreateUserResolver, GetUserResolver],
  exports: [UserService],
})
export class UserModule {}
