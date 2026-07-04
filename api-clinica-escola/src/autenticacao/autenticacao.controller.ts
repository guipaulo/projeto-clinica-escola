import { Body, Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import type { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { AutenticacaoService } from './autenticacao.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { UsuarioSemSenha } from '../usuarios/usuarios.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

type UsuarioAutenticado = UsuarioSemSenha;

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
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  perfil(@Req() request: RequisicaoComUsuario) {
    return {
      mensagem: 'Token válido',
      usuario: request.user,
    };
  }
}