import { Module } from '@nestjs/common';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PassportModule, UsuariosModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, LocalStrategy],
})

export class AutenticacaoModule {}