import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsuariosModule } from '../usuarios/usuarios.module';

import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule,UsuariosModule,
    JwtModule.register({
      secret: 'clinica-escola-jwt',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],

  controllers: [AutenticacaoController],

  providers: [
    AutenticacaoService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AutenticacaoModule {}