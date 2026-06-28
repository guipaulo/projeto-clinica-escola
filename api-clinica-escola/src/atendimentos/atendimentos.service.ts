import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';

type Atendimento = {
    id: number;
    aluno: string;
    profissional: string;
    servico: 'Medico' | 'Enfermeiro' | 'Psicologo' | 'Odontologista';
    data: string;
    status: 'Agendado' | 'Confirmado' | 'Cancelado';
}

@Injectable()
export class AtendimentosService {
    private atendimentos: Atendimento[] = [
        {
            id: 1,
            aluno: 'Paulo Guilherme',
            profissional: 'Dra. Ana Beatriz',
            servico: 'Medico',
            data: '28/06/2026 08:30',
            status: 'Agendado'
        },
        {
            id: 2,
            aluno: 'José Henrique',
            profissional: 'Enf. Ana Célia',
            servico: 'Enfermeiro',
            data: '28/06/2026 09:15',
            status: 'Confirmado'
        },
        {
            id: 3,
            aluno: 'Carlos Eduardo',
            profissional: 'Shirllane Nunes',
            servico: 'Psicologo',
            data: '28/06/2026 09:15',
            status: 'Cancelado'
        },
        {
            id: 4,
            aluno: 'Ellen Mayara',
            profissional: 'Dra. Carla Silva',
            servico: 'Odontologista',
            data: '28/06/2026 14:00',
            status: 'Confirmado'
        }
    ];

    listar() {
        return this.atendimentos;
    }

    buscarPorId(id: number) {
    const atendimento = this.atendimentos.find((at) => at.id === id);

    if(!atendimento) 
        throw new NotFoundException('Atendimento não encontrado!');

    return atendimento;
  }

  criar(dados: CreateAtendimentoDto) {
    const novoId =
    this.atendimentos.length > 0 ? Math.max(...this.atendimentos.map((at) => at.id)) + 1 : 1;

    const novoAtendimento: Atendimento = {
        id: novoId,
        aluno: dados.aluno,
        profissional: dados.profissional,
        servico: dados.servico,
        data: new Date().toLocaleString('pt-BR'),
        status: 'Agendado'
    };

    this.atendimentos.push(novoAtendimento);

    return novoAtendimento;
  }
}
