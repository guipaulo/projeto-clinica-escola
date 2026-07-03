import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';

type Atendimento = {
    id: number;
    aluno: string;
    profissional: string;
    especialidade: 'Medico' | 'Enfermeiro' | 'Psicologo' | 'Odontologista';
    data: string;
    status: 'Agendado' | 'Concluido' | 'Cancelado';
}

@Injectable()
export class AtendimentosService {
    private atendimentos: Atendimento[] = [
        {
            id: 1,
            aluno: 'Paulo Guilherme',
            profissional: 'Dra. Ana Beatriz',
            especialidade: 'Medico',
            data: '28/06/2026 08:30',
            status: 'Agendado'
        },
        {
            id: 2,
            aluno: 'José Henrique',
            profissional: 'Enf. Ana Célia',
            especialidade: 'Enfermeiro',
            data: '28/06/2026 09:15',
            status: 'Agendado'
        },
        {
            id: 3,
            aluno: 'Carlos Eduardo',
            profissional: 'Shirllane Nunes',
            especialidade: 'Psicologo',
            data: '28/06/2026 09:15',
            status: 'Cancelado'
        },
        {
            id: 4,
            aluno: 'Ellen Mayara',
            profissional: 'Dra. Carla Silva',
            especialidade: 'Odontologista',
            data: '28/06/2026 14:00',
            status: 'Concluido'
        }
    ];

    listarAtendimentos() {
        return this.atendimentos;
    }

    buscarPorId(id: number) {
        const atendimento = this.atendimentos.find((at) => at.id === id);

        if (!atendimento)
            throw new NotFoundException('Atendimento não encontrado!');

        return atendimento;
    }

    criarAtendimento(dados: CreateAtendimentoDto) {
        const novoId =
            this.atendimentos.length > 0 ? Math.max(...this.atendimentos.map((at) => at.id)) + 1 : 1;

        const novoAtendimento: Atendimento = {
            id: novoId,
            aluno: dados.aluno,
            profissional: dados.profissional,
            especialidade: dados.especialidade,
            data: new Date().toLocaleString('pt-BR'),
            status: 'Agendado'
        };

        this.atendimentos.push(novoAtendimento);

        return novoAtendimento;
    }

    atualizarAtendimento(id: number, dados: UpdateAtendimentoDto) {
        const atendimentoAtual = this.buscarPorId(id);

        if (atendimentoAtual.status === 'Cancelado')
            throw new ConflictException('Um atendimento cancelado não pode ser alterado!');

        if (atendimentoAtual.status === 'Agendado' && dados.especialidade !== undefined)
            throw new ConflictException('Não é permitido alterar a especialidade de um atendimento agendado!');

        const atendimentoAtualizado: Atendimento = { ...atendimentoAtual, ...dados };

        this.atendimentos = this.atendimentos.map((at) => at.id === id ? atendimentoAtualizado : at);

        return atendimentoAtualizado;
    }

    removerAtendimento(id: number) {
        const existe = this.atendimentos.some((t) => t.id === id);

        if (!existe)
            throw new NotFoundException('Atendimento não encontrado');

        this.atendimentos = this.atendimentos.filter((at) => at.id !== id);
    }
}

