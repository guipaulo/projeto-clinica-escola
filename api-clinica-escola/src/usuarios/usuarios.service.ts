import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
      senha: '$2b$10$JAVhJpbIKv5pHfr1zyWKDOe0oEybwISbjlO4xGc0gH.XW0bR9ddvW',
      perfil: 'admin',
      ativo: true,
      criadoEm: new Date().toISOString(),
    },
    {
      id: 2,
      nome: 'Bruno Costa',
      email: 'bruno@example.com',
      senha: '$2b$10$LiBQTNwuH4F7oIH9f7bfRuKW.e6YLQdZdMM7OlW7DZRDwJZUXEcvm',
      perfil: 'aluno',
      ativo: true,
      criadoEm: new Date().toISOString(),
    },
    {
      id: 3,
      nome: 'Carla Souza',
      email: 'carla@example.com',
      senha: '$2b$10$tBKc6RioCuqkza5dSNybcOe8QLIDq2PV6wZn7xjXSd64fM7SiNcWq',
      perfil: 'profissional',
      ativo: false,
      criadoEm: new Date().toISOString(),
    },
  ];

  async criar(dados: CriarUsuarioDto) {
    const usuarioExistente = this.buscarPorEmail(dados.email);

    if (usuarioExistente) {
      throw new ConflictException('Já existe um usuário com este e-mail.');
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const novoUsuario: Usuario = {
      id: this.usuarios.length + 1,
      nome: dados.nome,
      email: dados.email.trim().toLowerCase(),
      senha: senhaHash,
      perfil: dados.perfil,
      ativo: true,
      criadoEm: new Date().toISOString(),
    };

    this.usuarios.push(novoUsuario);
    
    return this.removerSenha(novoUsuario);
  }

  listar() {
    return this.usuarios.map(usuario =>
        this.removerSenha(usuario),
    );
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
