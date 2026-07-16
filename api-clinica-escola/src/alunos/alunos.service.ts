import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import type { UsuarioSemSenha } from '../usuarios/usuarios.service';

// Definição do tipo no próprio service
type Aluno = {
  id: number;
  nome: string;
  telefone: string;
  email?: string;
  ativo: boolean;
};

// Serviço para gerenciar os alunos na clínica-escola
@Injectable()
export class AlunosService {
  private alunos: Aluno[] = [
    {
      id: 1,
      nome: 'João Silva',
      telefone: '11999999999',
      email: 'joao@email.com',
      ativo: true,
    },
    {
      id: 2,
      nome: 'Maria Souza',
      telefone: '11888888888',
      ativo: true,
    },
  ];

  listar() {
    return [...this.alunos];
  }

  buscarPorId(id: number) {
    const aluno = this.alunos.find((a) => a.id === id);

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    return aluno;
  }

  criar(dados: CreateAlunoDto) {
    const novoId =
      this.alunos.length > 0
        ? Math.max(...this.alunos.map((a) => a.id)) + 1
        : 1;

    const novoAluno: Aluno = {
      id: novoId,
      nome: dados.nome,
      telefone: dados.telefone,
      email: dados.email,
      ativo: true,
    };

    this.alunos.push(novoAluno);

    return novoAluno;
  }

  criarAPartirDoUsuario(usuario: UsuarioSemSenha) {
    const novoId =
      this.alunos.length > 0
        ? Math.max(...this.alunos.map((a) => a.id)) + 1
        : 1;

    const aluno: Aluno = {
      id: novoId,
      nome: usuario.nome,
      email: usuario.email,
      telefone: '',
      ativo: true,
    };

    this.alunos.push(aluno);

    return aluno;
  }

  atualizarParcial(id: number, dados: UpdateAlunoDto) {
    const aluno = this.buscarPorId(id);

    const atualizado = {
      ...aluno,
      ...dados,
    };

    this.alunos = this.alunos.map((a) =>
      a.id === id ? atualizado : a,
    );

    return atualizado;
  }

  remover(id: number) {
    const existe = this.alunos.some((a) => a.id === id);

    if (!existe) {
      throw new NotFoundException('Aluno não encontrado');
    }

    this.alunos = this.alunos.filter((a) => a.id !== id);

    return {
      mensagem: `Aluno ${id} removido com sucesso`,
    };
  }
}
