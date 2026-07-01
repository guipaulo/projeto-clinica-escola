import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from 'src/entidades/horario.entidade';

@Injectable()
export class HorariosService {
    private horarios: Horario[] = [
        {
            id: 1,
            data: "01/07/2026", // Atualizado para o formato BR
            horaInicio: "08:00",
            horaFim: "09:00",
            servicoId: 1, 
            profissionalId: 1, 
            pacienteId: undefined, 
            status: "disponivel"
        },
        {
            id: 2,
            data: "01/07/2026", // Atualizado para o formato BR
            horaInicio: "09:00",
            horaFim: "10:00",
            servicoId: 2, 
            profissionalId: 2,
            pacienteId: 1, 
            status: "agendado"
        },
        {
            id: 3,
            data: "02/07/2026", // Atualizado para o formato BR
            horaInicio: "14:00",
            horaFim: "15:00",
            servicoId: 3, 
            profissionalId: 3, 
            pacienteId: 2,
            status: "cancelado"
        }
    ];

    async disponibilizar(createHorarioDto: CreateHorarioDto): Promise<Horario> {
        const [dia, mes, ano] = createHorarioDto.data.split('/');
        const dataFormatada = `${ano}-${mes}-${dia}`;

        const dataInicioString = `${dataFormatada}T${createHorarioDto.horaInicio}`;
        const dataFimString = `${dataFormatada}T${createHorarioDto.horaFim}`;

        const inicio = new Date(dataInicioString);
        const fim = new Date(dataFimString);

        if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
            throw new BadRequestException('Data ou horários fornecidos são inválidos.');
        }

        if (fim <= inicio) {
            throw new BadRequestException('A hora de término deve ser posterior à hora de início.');
        }

        const novoHorario: Horario = {
            id: this.horarios.length + 1,
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

    async listarDisponiveis(profissionalId?: number): Promise<Horario[]> {
        let filtrados = this.horarios.filter(h => h.status === 'disponivel');
        if (profissionalId) {
            filtrados = filtrados.filter(h => h.profissionalId === profissionalId);
        }
        return filtrados;
    }

    async atualizarStatus(id: number, updateStatusDto: UpdateHorarioDto): Promise<Horario> {
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