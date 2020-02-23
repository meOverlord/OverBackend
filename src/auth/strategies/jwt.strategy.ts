import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JWT_CONFIG_KEYS } from 'src/config';
import { AuthService } from '../services/auth/auth.service';

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
      secretOrKey: config.get(JWT_CONFIG_KEYS.SECRET),
      algorithms: ['RS256'],
		});
	}

	validate({sub, name}: PublicJwtPayload): JwtPayload {
		return { _id: sub, name };
	}
}
