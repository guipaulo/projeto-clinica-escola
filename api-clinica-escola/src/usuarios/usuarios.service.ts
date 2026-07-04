import { Injectable } from '@nestjs/common';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';

export type PerfilUsuario = 'admin' | 'aluno' | 'profissional';

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
      perfil: 'aluno',
      ativo: true,
      criadoEm: new Date().toISOString(),
    },
    {
      id: 3,
      nome: 'Carla Souza',
      email: 'carla@example.com',
      senha: 'inativa',
      perfil: 'profissional',
      ativo: false,
      criadoEm: new Date().toISOString(),
    },
  ];

  criar(dados: CriarUsuarioDto) {
    const novoUsuario: Usuario = { id: this.usuarios.length + 1, ...dados, perfil: dados.perfil, ativo: true,  criadoEm: new Date().toISOString(),};

    this.usuarios.push(novoUsuario);
    
    return novoUsuario;
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