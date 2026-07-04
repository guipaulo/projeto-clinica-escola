import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuariosService, UsuarioSemSenha } from '../usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AutenticacaoService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async validarUsuario(
    email: string,
    senha: string,
  ): Promise<UsuarioSemSenha> {
    if (!email || !senha) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const usuario = await this.usuariosService.buscarPorEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!usuario.ativo) {
      throw new ForbiddenException('Usuário inativo');
    }

    if (usuario.senha !== senha) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.usuariosService.removerSenha(usuario);
  }

  async login(dados: LoginDto) {
    const usuario = await this.validarUsuario(dados.email, dados.senha);
    return { mensagem: 'Login válido', usuario };
  }
}