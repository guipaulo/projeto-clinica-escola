import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

type Horario = {
    id: number,
    data: string,
    horaInicio: string,
    horaFim: string,
    servicoId: number,
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
            servicoId: 1,
            status: "disponivel"
        },
        {
            id: 2,
            data: "10/08/2026",
            horaInicio: "09:00",
            horaFim: "10:00",
            servicoId: 2,
            status: "disponivel"
        },
        {
            id: 3,
            data: "10/09/2026",
            horaInicio: "14:00",
            horaFim: "15:00",
            servicoId: 3,
            status: "disponivel"
        }
    ];

    buscarPorId(id: number) {
        let horario = this.horarios.find(h => h.id === id);
        if (!horario) {
            throw new NotFoundException(`Horário com ID ${id} não encontrado.`);
        }
        return horario;
    }

    listarHorariosDisponiveis(profissionalId?: number, data?: string) {
        let filtrados = this.horarios.filter(f => f.status === 'disponivel');

        if (profissionalId) {
            filtrados = filtrados.filter(f => f.servicoId === profissionalId);
        }

        if (data) {
            filtrados = filtrados.filter(f => f.data === data);
        }

        return filtrados;
    }

    disponibilizarHorario(createHorarioDto: CreateHorarioDto) {
        let dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);
        let dataDigitada = new Date(createHorarioDto.data.split('/').reverse().join('-'));
        dataDigitada.setHours(0, 0, 0, 0);

        let horaInicioStr = createHorarioDto.horaInicio.split(':').join('');
        let horaFimStr = createHorarioDto.horaFim.split(':').join('');

        let horaInicio = Number(horaInicioStr);
        let horaFim = Number(horaFimStr);

        if (horaInicio >= horaFim) {
            throw new BadRequestException('A hora de término deve ser posterior à hora de início.');
        }

        if (dataDigitada < dataAtual) {
            throw new BadRequestException('A data do horário não pode ser anterior à data atual.');
        }

        let horarioDuplicado = this.horarios.find(h =>
            h.servicoId === createHorarioDto.servicoId &&
            h.data === createHorarioDto.data &&
            h.horaInicio === createHorarioDto.horaInicio
        );

        if (horarioDuplicado) {
            throw new BadRequestException('Este profissional já possui este horário cadastrado nesta mesma data.');
        }

        const novoHorario: Horario = {
            id: this.horarios.length + 1,
            data: createHorarioDto.data,
            servicoId: createHorarioDto.servicoId,
            horaInicio: createHorarioDto.horaInicio,
            horaFim: createHorarioDto.horaFim,
            status: 'disponivel',
        };

        this.horarios.push(novoHorario);
        return novoHorario;
    }

    deletarHorario(id: number) {
        let horario = this.buscarPorId(id);

        if (!horario) {
            throw new NotFoundException(`Horário com ID ${id} não encontrado.`);
        }

        this.horarios = this.horarios.filter(h => h.id !== id);
        return `Horário com ID ${id} deletado com sucesso.`;
    }

    atualizarHorario(id: number, updateHorarioDto: UpdateHorarioDto) {
        let horarioAtual = this.buscarPorId(id);

        if (!horarioAtual) {
            throw new NotFoundException(`Horário com ID ${id} não encontrado.`);
        }

        if (updateHorarioDto.data) {
            let dataAtual = new Date();
            dataAtual.setHours(0, 0, 0, 0);
            let dataDigitada = new Date(updateHorarioDto.data.split('/').reverse().join('-'));
            dataDigitada.setHours(0, 0, 0, 0);

            if (dataDigitada < dataAtual) {
                throw new BadRequestException('A data do horário não pode ser anterior à data atual.');
            }
        }

        let horaInicio = updateHorarioDto.horaInicio || horarioAtual.horaInicio;
        let horaFim = updateHorarioDto.horaFim || horarioAtual.horaFim;

        let horaInicioNum = Number(horaInicio.split(':').join(''));
        let horaFimNum = Number(horaFim.split(':').join(''));

        if (horaInicioNum >= horaFimNum) {
            throw new BadRequestException('A hora de término deve ser posterior à hora de início.');
        }

        Object.entries(updateHorarioDto).filter(([_, v]) => v !== undefined && v !== null && v !== "")

        let horarioAtualizado: Horario = { ...horarioAtual, ...updateHorarioDto };
        this.horarios = this.horarios.map(h => h.id === id ? horarioAtualizado : h);

        return horarioAtualizado;
    }
}