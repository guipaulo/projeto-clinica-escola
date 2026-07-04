import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type PayloadJwt = {
  sub: number;
  email: string;
  perfil: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: 'clinica-escola-jwt',
    });
  }

  async validate(payload: PayloadJwt) {
    return {
      id: payload.sub,
      email: payload.email,
      perfil: payload.perfil,
    };
  }
}