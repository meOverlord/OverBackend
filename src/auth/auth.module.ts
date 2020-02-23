import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './strategies';
import { LocalStrategy } from './strategies/local.strategy';
import { JWT_CONFIG_KEYS } from 'src/config';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Global()
@Module({
	imports: [
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				privateKey: config.get(JWT_CONFIG_KEYS.SECRET),
				publicKey: config.get(JWT_CONFIG_KEYS.PUBLIC),
				signOptions: {
					algorithm: 'RS256',
					expiresIn: '1h',
					issuer: 'over-backend',
				},
			}),
			inject: [ConfigService]
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
