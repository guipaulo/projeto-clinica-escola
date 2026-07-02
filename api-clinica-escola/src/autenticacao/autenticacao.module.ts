import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from '../../../usuarios/usuarios.module';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { LocalStrategy } from './estrategia/local.estrategia';

@Module({
  imports: [PassportModule, UsuariosModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, LocalStrategy],
})
export class AutenticacaoModule {}