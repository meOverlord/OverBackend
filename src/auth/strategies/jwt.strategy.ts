import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONFIG_KEYS } from 'src/config';


interface PublicJwtPayload{
	sub: number,
	name: string
}

export interface JwtPayload{
	_id: number;
	name: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private config: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
      		secretOrKey: config.get(JWT_CONFIG_KEYS.PUBLIC),
      		algorithms: ['RS256'],
		});
	}

	validate({sub, name}: PublicJwtPayload): JwtPayload {
		return { _id: sub, name };
	}


}
