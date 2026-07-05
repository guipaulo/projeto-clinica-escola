import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

type Horario = {
    id: number,
    data: string,
    horaInicio: string,
    horaFim: string,
    profissionalId: number,
    status: 'disponivel' | 'indisponivel',
}

@Injectable()
export class HorariosService {
    private horarios: Horario[] = [
        {
            id: 1,
            data: "10/07/2026",
            horaInicio: "08:00",
            horaFim: "09:00",
            profissionalId: 1,
            status: "disponivel"
        },
        {
            id: 2,
            data: "10/08/2026",
            horaInicio: "09:00",
            horaFim: "10:00",
            profissionalId: 2,
            status: "disponivel"
        },
        {
            id: 3,
            data: "10/09/2026",
            horaInicio: "14:00",
            horaFim: "15:00",
            profissionalId: 3,
            status: "disponivel"
        }
    ];

    listarDisponiveis(profissionalId?: number, data?: string) {
        let filtrados = this.horarios.filter(f => f.status === 'disponivel');

        if (profissionalId) {
            filtrados = filtrados.filter(f => f.profissionalId === profissionalId);
        }

        if (data) {
            filtrados = filtrados.filter(f => f.data === data);
        }

        return filtrados;
    }

    disponibilizarServico(createHorarioDto: CreateHorarioDto) {
        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);
        const dataDigitada = new Date(createHorarioDto.data.split('/').reverse().join('-'));
        dataDigitada.setHours(0, 0, 0, 0);

        const horaInicioStr = createHorarioDto.horaInicio.split(':').join('');
        const horaFimStr = createHorarioDto.horaFim.split(':').join('');

        const horaInicio = Number(horaInicioStr);
        const horaFim = Number(horaFimStr);

        if (horaInicio >= horaFim) {
            throw new BadRequestException('A hora de término deve ser posterior à hora de início.');
        }

        if (dataDigitada < dataAtual) {
            throw new BadRequestException('A data do horário não pode ser anterior à data atual.');
        }

        const horarioDuplicado = this.horarios.find(h =>
            h.profissionalId === createHorarioDto.profissionalId &&
            h.data === createHorarioDto.data &&
            h.horaInicio === createHorarioDto.horaInicio
        );

        if (horarioDuplicado) {
            throw new BadRequestException('Este profissional já possui este horário cadastrado nesta mesma data.');
        }

        const novoHorario: Horario = {
            id: this.horarios.length + 1,
            data: createHorarioDto.data,
            profissionalId: createHorarioDto.profissionalId,
            horaInicio: createHorarioDto.horaInicio,
            horaFim: createHorarioDto.horaFim,
            status: 'disponivel',
        };

        this.horarios.push(novoHorario);
        return novoHorario;
    }

    deletarServico(id: number) {
        const horario = this.horarios.find(h => h.id === id);

        if (!horario) {
            throw new NotFoundException(`Horário com ID ${id} não encontrado.`);
        }

        horario.status = 'indisponivel';
        return 'Horário marcado como indisponível com sucesso.';
    }

    atualizarStatus(id: number, updateHorarioDto: UpdateHorarioDto) {
        const horarioAtual = this.horarios.find(h => h.id === id);

        if (!horarioAtual) {
            throw new NotFoundException(`Horário com ID ${id} não encontrado.`);
        }

        if (updateHorarioDto.data) {
            const dataAtual = new Date();
            dataAtual.setHours(0, 0, 0, 0);
            const dataDigitada = new Date(updateHorarioDto.data.split('/').reverse().join('-'));
            dataDigitada.setHours(0, 0, 0, 0);

            if (dataDigitada < dataAtual) {
                throw new BadRequestException('A data do horário não pode ser anterior à data atual.');
            }
        }

        const horaInicio = updateHorarioDto.horaInicio || horarioAtual.horaInicio;
        const horaFim = updateHorarioDto.horaFim || horarioAtual.horaFim;

        const horaInicioNum = Number(horaInicio.split(':').join(''));
        const horaFimNum = Number(horaFim.split(':').join(''));

        if (horaInicioNum >= horaFimNum) {
            throw new BadRequestException('A hora de término deve ser posterior à hora de início.');
        }

        const dadosFiltrados = Object.fromEntries(
            Object.entries(updateHorarioDto).filter(([_, v]) => v !== undefined && v !== null && v !== "")
        );

        const horarioAtualizado: Horario = { ...horarioAtual, ...dadosFiltrados } as Horario;
        this.horarios = this.horarios.map(h => h.id === id ? horarioAtualizado : h);

        return horarioAtualizado;
    }
}