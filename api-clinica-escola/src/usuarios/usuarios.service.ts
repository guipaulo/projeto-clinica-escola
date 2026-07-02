import { Injectable } from '@nestjs/common';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';

@Injectable()
export class UsuariosService {
  private usuarios: CriarUsuarioDto[] = [];

  criar(dados: CriarUsuarioDto) {
    this.usuarios.push(dados);
    return dados;
  }

  listar() {
    return this.usuarios;
  }
}