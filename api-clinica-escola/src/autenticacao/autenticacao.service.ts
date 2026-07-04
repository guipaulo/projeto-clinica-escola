import {ForbiddenException, Injectable, UnauthorizedException,} from '@nestjs/common';
import { UsuariosService, UsuarioSemSenha } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AutenticacaoService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validarUsuario(
    email: string,
    senha: string,
  ): Promise<UsuarioSemSenha> {
    if (!email || !senha) {
      throw new UnauthorizedException('Email está vazio, undefined, null ou false. Ou senha está vazia, undefined, null ou false.');
    }

    const usuario = await this.usuariosService.buscarPorEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Usuário inválido');
    }

    if (!usuario.ativo) {
      throw new ForbiddenException('Usuário inativo');
    }

    if (usuario.senha !== senha) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return this.usuariosService.removerSenha(usuario);
  }

  async login(usuario: UsuarioSemSenha) {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      perfil: usuario.perfil,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario,
    };
  }
}