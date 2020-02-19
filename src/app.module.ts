import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { appConfig, mongoConfig } from './config';

@Module({
  imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, mongoConfig]
        }),
        AuthModule, ClientModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
