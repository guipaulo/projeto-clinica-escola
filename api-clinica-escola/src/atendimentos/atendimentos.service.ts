import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
import { FiltroAtendimentoDto } from './dto/filtro-atendimento.dto';
import { AlunosService } from '../alunos/alunos.service';
import { ProfissionaisService } from '../profissionais/profissionais.service';
import { HorariosService } from '../horarios/horarios.service';
import { ServicosService } from '../servicos/servicos.service';

type Atendimento = {
  id: number;
  alunoId: number;
  profissionalId: number;
  servicoId: number;
  horarioId: number;
  status: 'Agendado' | 'Concluido' | 'Cancelado';
};

@Injectable()
export class AtendimentosService {
  constructor(
    private readonly alunosService: AlunosService,
    private readonly profissionaisService: ProfissionaisService,
    private readonly horariosService: HorariosService,
    private readonly servicosService: ServicosService,
  ) {}
  private atendimentos: Atendimento[] = [
    { id: 1, alunoId: 1, profissionalId: 6, servicoId: 1, horarioId: 1, status: 'Concluido' },
    { id: 2, alunoId: 2, profissionalId: 6, servicoId: 2, horarioId: 2, status: 'Concluido' },
    { id: 3, alunoId: 3, profissionalId: 6, servicoId: 1, horarioId: 3, status: 'Cancelado' },
    { id: 4, alunoId: 1, profissionalId: 6, servicoId: 2, horarioId: 1, status: 'Concluido' },
    { id: 5, alunoId: 2, profissionalId: 6, servicoId: 1, horarioId: 7, status: 'Agendado' },
    { id: 6, alunoId: 3, profissionalId: 6, servicoId: 2, horarioId: 3, status: 'Concluido' },
    { id: 7, alunoId: 1, profissionalId: 6, servicoId: 1, horarioId: 1, status: 'Cancelado' },
    { id: 8, alunoId: 2, profissionalId: 6, servicoId: 2, horarioId: 2, status: 'Concluido' },
    { id: 9, alunoId: 3, profissionalId: 6, servicoId: 1, horarioId: 3, status: 'Concluido' },
    { id: 10, alunoId: 1, profissionalId: 6, servicoId: 2, horarioId: 8, status: 'Agendado' },
    { id: 11, alunoId: 2, profissionalId: 6, servicoId: 1, horarioId: 2, status: 'Concluido' },
    { id: 12, alunoId: 3, profissionalId: 6, servicoId: 2, horarioId: 3, status: 'Cancelado' },
    { id: 13, alunoId: 1, profissionalId: 6, servicoId: 1, horarioId: 1, status: 'Concluido' },
    { id: 14, alunoId: 2, profissionalId: 6, servicoId: 2, horarioId: 2, status: 'Concluido' },
    { id: 15, alunoId: 3, profissionalId: 6, servicoId: 1, horarioId: 9, status: 'Agendado' },
    { id: 16, alunoId: 1, profissionalId: 6, servicoId: 2, horarioId: 1, status: 'Concluido' },
    { id: 17, alunoId: 2, profissionalId: 6, servicoId: 1, horarioId: 2, status: 'Cancelado' },
    { id: 18, alunoId: 3, profissionalId: 6, servicoId: 2, horarioId: 3, status: 'Concluido' },
    { id: 19, alunoId: 1, profissionalId: 6, servicoId: 1, horarioId: 10, status: 'Agendado' },
    { id: 20, alunoId: 2, profissionalId: 6, servicoId: 2, horarioId: 2, status: 'Concluido' },
  ];

  listarAtendimentos(filtros?: FiltroAtendimentoDto) {
    let resultado = [...this.atendimentos];

    if (filtros?.alunoId !== undefined) {
      resultado = resultado.filter(
        (atendimento) => atendimento.alunoId === filtros.alunoId,
      );
    }

    if (filtros?.profissionalId !== undefined) {
      resultado = resultado.filter(
        (atendimento) =>
          atendimento.profissionalId === filtros.profissionalId,
      );
    }

    if (filtros?.servicoId !== undefined) {
      resultado = resultado.filter(
        (atendimento) => atendimento.servicoId === filtros.servicoId,
      );
    }

    if (filtros?.horarioId !== undefined) {
      resultado = resultado.filter(
        (atendimento) => atendimento.horarioId === filtros.horarioId,
      );
    }

    const resumo = {
      agendados: resultado.filter(
        (atendimento) => atendimento.status === 'Agendado',
      ).length,
      concluidos: resultado.filter(
        (atendimento) => atendimento.status === 'Concluido',
      ).length,
      cancelados: resultado.filter(
        (atendimento) => atendimento.status === 'Cancelado',
      ).length,
    };

    if (filtros?.status) {
      resultado = resultado.filter(
        (atendimento) => atendimento.status === filtros.status,
      );
    }

    resultado.sort((a, b) => b.id - a.id);

    if (filtros?.pagina === undefined && filtros?.limite === undefined) {
      return resultado;
    }

    const pagina = filtros.pagina ?? 1;
    const limite = filtros.limite ?? 8;
    const totalItens = resultado.length;
    const totalPaginas = Math.max(1, Math.ceil(totalItens / limite));
    const paginaValida = Math.min(pagina, totalPaginas);
    const inicio = (paginaValida - 1) * limite;

    return {
      dados: resultado.slice(inicio, inicio + limite),
      paginacao: {
        pagina: paginaValida,
        limite,
        totalItens,
        totalPaginas,
      },
      resumo,
    };
  }

  buscarPorId(id: number) {
    const atendimento = this.atendimentos.find((at) => at.id === id);

    if (!atendimento)
      throw new NotFoundException('Atendimento não encontrado!');

    return atendimento;
  }

  criarAtendimento(dados: CreateAtendimentoDto) {
    const aluno = this.alunosService.buscarPorId(dados.alunoId);

    const profissional = this.profissionaisService.buscarPorId(
      dados.profissionalId,
    );

    const horario = this.horariosService.buscarPorId(dados.horarioId);
    const servico = this.servicosService.buscarPorId(dados.servicoId);

    if (!aluno.ativo) {
      throw new ConflictException(
        'Não é possível agendar atendimento para um aluno inativo.',
      );
    }

    if (profissional.ativo === false) {
      throw new ConflictException(
        'Não é possível agendar atendimento com um profissional inativo.',
      );
    }

    if (horario.status !== 'disponivel') {
      throw new ConflictException('O horário informado não está disponível.');
    }

    if (horario.profissionalId !== profissional.id) {
      throw new ConflictException(
        'O horário selecionado não pertence ao profissional informado.',
      );
    }

    if (!profissional.servicesIds.includes(servico.id)) {
      throw new ConflictException(
        'O profissional informado não realiza o serviço informado.',
      );
    }

    const novoId =
      this.atendimentos.length > 0
        ? Math.max(...this.atendimentos.map((at) => at.id)) + 1
        : 1;

    const novoAtendimento: Atendimento = {
      id: novoId,
      alunoId: dados.alunoId,
      profissionalId: dados.profissionalId,
      servicoId: dados.servicoId,
      horarioId: dados.horarioId,
      status: 'Agendado',
    };

    this.horariosService.atualizarHorario(horario.id, {
      status: 'indisponivel',
    });

    this.atendimentos.push(novoAtendimento);

    return novoAtendimento;
  }

  atualizarAtendimento(id: number, dados: UpdateAtendimentoDto) {
    const atendimentoAtual = this.buscarPorId(id);

    if (atendimentoAtual.status === 'Cancelado')
      throw new ConflictException(
        'Um atendimento cancelado não pode ser alterado!',
      );

    if (atendimentoAtual.status === 'Agendado' && dados.especialidade !== undefined)
      throw new ConflictException('Não é permitido alterar a especialidade de um atendimento agendado!');

    if (
      atendimentoAtual.status === 'Agendado' &&
      dados.status === 'Cancelado'
    ) {
      this.horariosService.atualizarHorario(atendimentoAtual.horarioId, {
        status: 'disponivel',
      });
    }

    const atendimentoAtualizado: Atendimento = {
      ...atendimentoAtual,
      ...dados,
    };

    this.atendimentos = this.atendimentos.map((at) =>
      at.id === id ? atendimentoAtualizado : at,
    );

    return atendimentoAtualizado;
  }

  removerAtendimento(id: number) {
    const existe = this.atendimentos.some((t) => t.id === id);

    if (!existe) throw new NotFoundException('Atendimento não encontrado');

    this.atendimentos = this.atendimentos.filter((at) => at.id !== id);
    return { mensagem: `Atendimento ${id} removido com sucesso` };
  }
}
