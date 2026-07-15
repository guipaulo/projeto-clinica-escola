import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServiceDto } from './dto/update-servico.dto';

type Servico = {
  id: number;
  nome:
  | 'Atendimento Médico'
  | 'Atendimento Psicológico'
  | 'Atendimento Odontológico'
  | 'Atendimento de Enfermagem';
  descricao?: string;
  duracao: number;
};

@Injectable()
export class ServicosService {
  private servicos: Servico[] = [
    {
      id: 1,
      nome: 'Atendimento Médico',
      descricao:
        'Consulta médica para avaliação de sintomas, diagnóstico e prescrição de tratamento.',
      duracao: 30,
    },
    {
      id: 2,
      nome: 'Atendimento Psicológico',
      descricao:
        'Sessões de psicoterapia para apoio emocional, orientação e desenvolvimento pessoal.',
      duracao: 50,
    },
    {
      id: 3,
      nome: 'Atendimento Odontológico',
      descricao:
        'Sessões de odontologia para cuidados dentários, incluindo limpeza, restaurações e tratamentos preventivos.',
      duracao: 40,
    },
    {
      id: 4,
      nome: 'Atendimento de Enfermagem',
      descricao:
        'Serviço de enfermagem para cuidados básicos, administração de medicamentos e monitoramento de pacientes.',
      duracao: 20,
    },
  ];

  listarServicos() {
    return this.servicos;
  }

  buscarPorId(id: number) {
    const servico = this.servicos.find((s) => s.id === id);
    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado.`);
    }
    return servico;
  }

  cadastrarServico(createServicoDto: CreateServicoDto) {
    const novoServico: Servico = {
      id: this.servicos.length + 1,
      nome: createServicoDto.nome,
      descricao: createServicoDto.descricao,
      duracao: createServicoDto.duracao,
    };

    this.servicos.push(novoServico);
    return novoServico;
  }

  atualizarServico(id: number, updateServicoDto: UpdateServiceDto) {
    const servico = this.buscarPorId(id);

    const UpdateServicoDto = Object.fromEntries(
      Object.entries(updateServicoDto).filter(
        ([v]) => v !== undefined && v !== null && v !== '',
      ),
    );

    const servicoAtualizado: Servico = { ...servico, ...UpdateServicoDto };
    this.servicos = this.servicos.map((s) =>
      s.id === id ? servicoAtualizado : s,
    );
    return servicoAtualizado;
  }

  deletarServico(id: number) {
    const servico = this.buscarPorId(id);

    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado.`);
    }

    this.servicos = this.servicos.filter((s) => s.id !== id);
    return 'Serviço deletado com sucesso.';
  }
}
