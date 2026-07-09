import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosModule } from '../usuarios/usuarios.module';

import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [ConfigModule, PassportModule,UsuariosModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],

  controllers: [AutenticacaoController],

  providers: [
    AutenticacaoService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
  ],
})
export class AutenticacaoModule {}