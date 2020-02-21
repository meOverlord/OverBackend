import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from "nestjs-typegoose";

import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { appConfig, mongoConfig, MONGO_CONFIG_KEYS } from './config';

@Module({
  imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, mongoConfig]
        }),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                console.log(configService.get(MONGO_CONFIG_KEYS.URI));
                return {
              uri: configService.get(MONGO_CONFIG_KEYS.URI),
              useNewUrlParser: true,
            }},
            inject: [ConfigService],
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        AuthModule, ClientModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
