import { Injectable } from '@nestjs/common';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';

export type PerfilUsuario = 'admin' | 'estudante';

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  perfil: PerfilUsuario;
  ativo: boolean;
  criadoEm: string;
};

export type UsuarioSemSenha = Omit<Usuario, 'senha'>;

@Injectable()
export class UsuariosService {
  private readonly usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'Ana Lima',
      email: 'ana@example.com',
      senha: '123456',
      perfil: 'admin',
      ativo: true,
      criadoEm: new Date().toISOString(),
    },
    {
      id: 2,
      nome: 'Bruno Costa',
      email: 'bruno@example.com',
      senha: 'abcdef',
      perfil: 'estudante',
      ativo: true,
      criadoEm: new Date().toISOString(),
    },
    {
      id: 3,
      nome: 'Carla Souza',
      email: 'carla@example.com',
      senha: 'inativa',
      perfil: 'estudante',
      ativo: false,
      criadoEm: new Date().toISOString(),
    },
  ];

  criar(dados: CriarUsuarioDto) {
    const NovoUsuario: Usuario = { id: this.usuarios.length + 1, ...dados,  criadoEm: new Date().toISOString(),};
    
    this.usuarios.push(NovoUsuario);
    
    return NovoUsuario;
  }

  listar() {
    return this.usuarios;
  }
  
  buscarPorEmail(email: string): Usuario | null {
    const emailNormalizado = email.trim().toLowerCase();

    return (
      this.usuarios.find((usuario) => usuario.email === emailNormalizado) ??
      null
    );
  }

  removerSenha(usuario: Usuario): UsuarioSemSenha {
    const { senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }
}