import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from "nestjs-typegoose";
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { appConfig, mongoConfig, MONGO_CONFIG_KEYS } from './config';
import { AppExceptionFilter, AppException, formatGraphQlError } from './exceptions';
import { UserModule } from './user/user.module';
import { GraphQLError } from 'graphql';


@Module({
  imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, mongoConfig]
        }),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: configService.get(MONGO_CONFIG_KEYS.URI),
                    useNewUrlParser: true,
                }
            },
            inject: [ConfigService],
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            formatError: formatGraphQlError,
        }),
        AuthModule, ClientModule, UserModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AppExceptionFilter,
          },
    ],
})
export class AppModule {}
