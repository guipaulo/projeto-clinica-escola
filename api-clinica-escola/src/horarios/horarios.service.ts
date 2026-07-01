import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from 'src/entidades/horario.entidade';

@Injectable()
export class HorariosService {
    private horarios: Horario[] = [
        {
            id: "h1",
            data: "2026-07-01",
            horaInicio: "08:00",
            horaFim: "09:00",
            servicoId: "s1", 
            profissionalId: "p1", 
            pacienteId: undefined, 
            status: "disponivel"
        },
        {
            id: "h2",
            data: "2026-07-01",
            horaInicio: "09:00",
            horaFim: "10:00",
            servicoId: "s2", 
            profissionalId: "p2",
            pacienteId: "pac1", 
            status: "agendado"
        },
        {
            id: "h3",
            data: "2026-07-02",
            horaInicio: "14:00",
            horaFim: "15:00",
            servicoId: "s3", 
            profissionalId: "p3", 
            pacienteId: "pac2",
            status: "cancelado"
        }
    ];

    async disponibilizar(createHorarioDto: CreateHorarioDto): Promise<Horario> {
        const inicio = new Date(createHorarioDto.horaInicio);
        const fim = new Date(createHorarioDto.horaFim);

        if (fim <= inicio) {
            throw new BadRequestException('A hora de término deve ser posterior à hora de início.');
        }

        const novoHorario: Horario = {
            id: Math.random().toString(36).substr(2, 9),
            profissionalId: createHorarioDto.profissionalId,
            servicoId: createHorarioDto.servicoId,
            data: createHorarioDto.data,
            horaInicio: createHorarioDto.horaInicio,
            horaFim: createHorarioDto.horaFim,
            status: 'disponivel',
        };

        this.horarios.push(novoHorario);
        return novoHorario;
    }

    async listarDisponiveis(profissionalId?: string): Promise<Horario[]> {
        let filtrados = this.horarios.filter(h => h.status === 'disponivel');
        if (profissionalId) {
            filtrados = filtrados.filter(h => h.profissionalId === profissionalId);
        }
        return filtrados;
    }

    async atualizarStatus(id: string, updateStatusDto: UpdateHorarioDto): Promise<Horario> {
        const horario = this.horarios.find(h => h.id === id);
        if (!horario) {
            throw new NotFoundException(`Horário com ID ${id} não encontrado.`);
        }

        if (updateStatusDto.status === 'reservado') {
            horario.status = 'agendado';
        } else {
            horario.status = updateStatusDto.status;
        }

        return horario;
    }
}