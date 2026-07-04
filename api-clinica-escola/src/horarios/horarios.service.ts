import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from 'src/entidades/horario.entidade';

@Injectable()
export class HorariosService {
    private validarIntervalo(horaInicio: string, horaFim: string) {
        const inicio = new Date(`1970-01-01T${horaInicio}:00`);
        const fim = new Date(`1970-01-01T${horaFim}:00`);

        if (fim <= inicio) {
            throw new BadRequestException('A hora de término deve ser posterior à hora de início.');
        }
    }
    
    private horarios: Horario[] = [
        {
            id: 1,
            horaInicio: "08:00",
            horaFim: "09:00",
            profissionalId: 1,
            status: "disponivel"
        },
        {
            id: 2,
            horaInicio: "09:00",
            horaFim: "10:00",
            profissionalId: 2,
            status: "disponivel"
        },
        {
            id: 3,
            horaInicio: "14:00",
            horaFim: "15:00",
            profissionalId: 3,
            status: "disponivel"
        }
    ];

    listarDisponiveis(profissionalId?: number) {
        let filtrados = this.horarios.filter(f => f.status === 'disponivel');

        if (profissionalId) {
            filtrados = filtrados.filter(f => f.profissionalId === profissionalId);
        }

        return filtrados;
    }

    disponibilizarServico(createHorarioDto: CreateHorarioDto) {
        this.validarIntervalo(createHorarioDto.horaInicio, createHorarioDto.horaFim);

        const novoHorario: Horario = {
            id: this.horarios.length + 1,
            profissionalId: createHorarioDto.profissionalId,
            horaInicio: createHorarioDto.horaInicio,
            horaFim: createHorarioDto.horaFim,
            status: 'disponivel',
        };

        this.horarios.push(novoHorario);
        return novoHorario;
    }

    deletarServico(id: number) {
        let horario = this.horarios.find(h => h.id === id);

        if (!horario) {
            return 'Horário não encontrado.';
        }

        if (horario.status == 'disponivel') {
            throw new BadRequestException('Não é possível deletar um horário que está disponível.');
        }

        horario.status = 'disponivel';
        return 'Horário deletado com sucesso.';
    }

    atualizarStatus(id: number, updateHorarioDto: UpdateHorarioDto) {
        const horario = this.horarios.find(h => h.id === id);

        if (!horario) {
            throw new NotFoundException('Horário com ID ${id} não encontrado.');
        }

        const horaInicio = updateHorarioDto.horaInicio ?? horario.horaInicio;
        const horaFim = updateHorarioDto.horaFim ?? horario.horaFim;

        this.validarIntervalo(horaInicio, horaFim);

        const camposAtualizados = Object.entries(updateHorarioDto).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key as keyof UpdateHorarioDto] = value;
            }
            return acc;
        }, {} as Partial<UpdateHorarioDto>);

        const horarioAtualizado: Horario = { ...horario, ...camposAtualizados };

        this.horarios = this.horarios.map((h) => h.id === id ? horarioAtualizado : h);

        return horarioAtualizado;
    }
}