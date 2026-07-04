import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { AutenticacaoService } from './autenticacao.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { PerfilUsuario } from '../usuarios/usuarios.service';

type UsuarioAutenticado = {
  id: number;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  ativo: boolean;
};

type RequisicaoComUsuario = Request & {
  user: UsuarioAutenticado;
};

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly authService: AutenticacaoService) {}

  @Post('verificar-login')
  async verificarLogin(@Body() body: LoginDto) {
    const usuario = await this.authService.validarUsuario(
      body.email,
      body.senha,
    );

    return {
      mensagem: 'Credenciais válidas via service',
      usuario,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() request: RequisicaoComUsuario) {
    return {
      mensagem: 'Login realizado com Passport local',
      usuario: request.user,
    };
  }
}