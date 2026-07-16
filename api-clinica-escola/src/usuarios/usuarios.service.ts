import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AlunosService } from '../alunos/alunos.service';
import { ProfissionaisService } from '../profissionais/profissionais.service';

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
  constructor(
    private readonly alunosService: AlunosService,
    private readonly profissionaisService: ProfissionaisService,
  ) {}

  private readonly usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'Ingridy Candido',
      email: 'ingridy@example.com',
      senha:
        '$2b$10$JAVhJpbIKv5pHfr1zyWKDOe0oEybwISbjlO4xGc0gH.XW0bR9ddvW',
      perfil: 'admin',
      ativo: true,
      criadoEm: new Date().toISOString(),
    },
    {
      id: 2,
      nome: 'Paulo Guilherme',
      email: 'paulo@example.com',
      senha:
        '$2b$10$LiBQTNwuH4F7oIH9f7bfRuKW.e6YLQdZdMM7OlW7DZRDwJZUXEcvm',
      perfil: 'aluno',
      ativo: true,
      criadoEm: new Date().toISOString(),
    },
    {
      id: 3,
      nome: 'Jose Henrique',
      email: 'jose@example.com',
      senha:
        '$2b$10$tBKc6RioCuqkza5dSNybcOe8QLIDq2PV6wZn7xjXSd64fM7SiNcWq',
      perfil: 'profissional',
      ativo: false,
      criadoEm: new Date().toISOString(),
    },
    {
      id: 4,
      nome: 'Nicole Carvalho',
      email: 'nicole@example.com',
      senha:
        '$2b$10$JAVhJpbIKv5pHfr1zyWKDOe0oEybwISbjlO4xGc0gH.XW0bR9ddvW',
      perfil: 'aluno',
      ativo: true,
      criadoEm: new Date().toISOString(),
    },
  ];

  async criar(dados: CriarUsuarioDto): Promise<UsuarioSemSenha> {
    const usuarioExistente = this.buscarPorEmail(dados.email);

    if (usuarioExistente) {
      throw new ConflictException(
        'Já existe um usuário com este e-mail.',
      );
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

    const usuarioSemSenha = this.removerSenha(novoUsuario);

    if (usuarioSemSenha.perfil === 'aluno') {
      this.alunosService.criarAPartirDoUsuario(usuarioSemSenha);
    }

    if (usuarioSemSenha.perfil === 'profissional') {
      this.profissionaisService.criarAPartirDoUsuario(usuarioSemSenha);
    }

    return usuarioSemSenha;
  }

  listar(): UsuarioSemSenha[] {
    return this.usuarios.map((usuario) =>
      this.removerSenha(usuario),
    );
  }

  buscarPorEmail(email: string): Usuario | null {
    const emailNormalizado = email.trim().toLowerCase();

    return (
      this.usuarios.find(
        (usuario) =>
          usuario.email.trim().toLowerCase() === emailNormalizado,
      ) ?? null
    );
  }

  buscarPorId(id: number): UsuarioSemSenha {
    const usuario = this.usuarios.find(
      (usuario) => usuario.id === id,
    );

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.removerSenha(usuario);
  }

  async atualizar(
    id: number,
    dados: UpdateUsuarioDto,
  ): Promise<UsuarioSemSenha> {
    const usuario = this.usuarios.find((u) => u.id === id);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (dados.email) {
      const emailNormalizado = dados.email.trim().toLowerCase();

      const usuarioExistente =
        this.buscarPorEmail(emailNormalizado);

      if (usuarioExistente && usuarioExistente.id !== id) {
        throw new ConflictException(
          'Já existe um usuário com este e-mail.',
        );
      }

      usuario.email = emailNormalizado;
    }

    if (dados.nome) {
      usuario.nome = dados.nome;
    }

    if (dados.perfil) {
      usuario.perfil = dados.perfil;
    }

    if (dados.ativo !== undefined) {
      usuario.ativo = dados.ativo;
    }

    if (dados.senha) {
      usuario.senha = await bcrypt.hash(dados.senha, 10);
    }

    return this.removerSenha(usuario);
  }

  inativar(id: number): UsuarioSemSenha {
    const usuario = this.usuarios.find((u) => u.id === id);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (!usuario.ativo) {
      throw new ConflictException(
        'O usuário já está inativo.',
      );
    }

    usuario.ativo = false;

    return this.removerSenha(usuario);
  }

  reativar(id: number): UsuarioSemSenha {
    const usuario = this.usuarios.find((u) => u.id === id);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (usuario.ativo) {
      throw new ConflictException(
        'O usuário já está ativo.',
      );
    }

    usuario.ativo = true;

    return this.removerSenha(usuario);
  }

  public removerSenha(usuario: Usuario): UsuarioSemSenha {
  const { senha, ...usuarioSemSenha } = usuario;
  return usuarioSemSenha;
  }
}