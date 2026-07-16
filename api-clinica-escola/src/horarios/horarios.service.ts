import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

type Horario = {
  id: number;
  profissionalId: number;
  data: string;
  horaInicio: string;
  horaFim: string;
  status: 'disponivel' | 'indisponivel';
};

@Injectable()
export class HorariosService {
  private horarios: Horario[] = [
    {
      id: 1,
      profissionalId: 6,
      data: '10/07/2026',
      horaInicio: '08:00',
      horaFim: '09:00',
      status: 'indisponivel',
    },
    {
      id: 2,
      profissionalId: 6,
      data: '12/07/2026',
      horaInicio: '09:00',
      horaFim: '10:00',
      status: 'indisponivel',
    },
    {
      id: 3,
      profissionalId: 6,
      data: '14/07/2026',
      horaInicio: '14:00',
      horaFim: '15:00',
      status: 'indisponivel',
    },
    {
      id: 4,
      profissionalId: 6,
      data: '20/07/2026',
      horaInicio: '08:00',
      horaFim: '09:00',
      status: 'disponivel',
    },
    {
      id: 5,
      profissionalId: 6,
      data: '22/07/2026',
      horaInicio: '09:00',
      horaFim: '10:00',
      status: 'disponivel',
    },
    {
      id: 6,
      profissionalId: 6,
      data: '24/07/2026',
      horaInicio: '14:00',
      horaFim: '15:00',
      status: 'disponivel',
    },
    {
      id: 7,
      profissionalId: 6,
      data: '26/07/2026',
      horaInicio: '08:00',
      horaFim: '09:00',
      status: 'indisponivel',
    },
    {
      id: 8,
      profissionalId: 6,
      data: '27/07/2026',
      horaInicio: '09:00',
      horaFim: '10:00',
      status: 'indisponivel',
    },
    {
      id: 9,
      profissionalId: 6,
      data: '28/07/2026',
      horaInicio: '14:00',
      horaFim: '15:00',
      status: 'indisponivel',
    },
    {
      id: 10,
      profissionalId: 6,
      data: '29/07/2026',
      horaInicio: '15:00',
      horaFim: '16:00',
      status: 'indisponivel',
    },
  ];

  listarHorarios() {
    return this.horarios;
  }

  buscarPorId(id: number) {
    const horario = this.horarios.find((horario) => horario.id === id);

    if (!horario) {
      throw new NotFoundException(`Horário com ID ${id} não encontrado.`);
    }

    return horario;
  }

  listarHorariosDisponiveis(data?: string) {
    let filtrados = this.horarios.filter(
      (horario) => horario.status === 'disponivel',
    );

    if (data) {
      filtrados = filtrados.filter((horario) => horario.data === data);
    }

    return filtrados;
  }

  disponibilizarHorario(createHorarioDto: CreateHorarioDto) {
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    const dataDigitada = new Date(
      createHorarioDto.data.split('/').reverse().join('-'),
    );
    dataDigitada.setHours(0, 0, 0, 0);

    const horaInicio = Number(createHorarioDto.horaInicio.replace(':', ''));

    const horaFim = Number(createHorarioDto.horaFim.replace(':', ''));

    if (horaInicio >= horaFim) {
      throw new ConflictException(
        'A hora de término deve ser posterior à hora de início.',
      );
    }

    if (dataDigitada < dataAtual) {
      throw new ConflictException(
        'A data do horário não pode ser anterior à data atual.',
      );
    }

    const horarioDuplicado = this.horarios.find(
      (horario) =>
        horario.profissionalId === createHorarioDto.profissionalId &&
        horario.data === createHorarioDto.data &&
        horario.horaInicio === createHorarioDto.horaInicio &&
        horario.horaFim === createHorarioDto.horaFim,
    );

    if (horarioDuplicado) {
      throw new ConflictException(
        'Este profissional já possui esse horário cadastrado nesta data.',
      );
    }

    const novoId =
      this.horarios.length > 0
        ? Math.max(...this.horarios.map((horario) => horario.id)) + 1
        : 1;

    const novoHorario: Horario = {
      id: novoId,
      profissionalId: createHorarioDto.profissionalId,
      data: createHorarioDto.data,
      horaInicio: createHorarioDto.horaInicio,
      horaFim: createHorarioDto.horaFim,
      status: 'disponivel',
    };

    this.horarios.push(novoHorario);

    return novoHorario;
  }

  atualizarHorario(id: number, updateHorarioDto: UpdateHorarioDto) {
    const horarioAtual = this.buscarPorId(id);

    if (updateHorarioDto.data) {
      const dataAtual = new Date();
      dataAtual.setHours(0, 0, 0, 0);

      const dataDigitada = new Date(
        updateHorarioDto.data.split('/').reverse().join('-'),
      );
      dataDigitada.setHours(0, 0, 0, 0);

      if (dataDigitada < dataAtual) {
        throw new ConflictException(
          'A data do horário não pode ser anterior à data atual.',
        );
      }
    }

    const horaInicio = updateHorarioDto.horaInicio ?? horarioAtual.horaInicio;

    const horaFim = updateHorarioDto.horaFim ?? horarioAtual.horaFim;

    const horaInicioNum = Number(horaInicio.replace(':', ''));
    const horaFimNum = Number(horaFim.replace(':', ''));

    if (horaInicioNum >= horaFimNum) {
      throw new ConflictException(
        'A hora de término deve ser posterior à hora de início.',
      );
    }

    const horarioAtualizado: Horario = {
      ...horarioAtual,
      ...updateHorarioDto,
    };

    this.horarios = this.horarios.map((horario) =>
      horario.id === id ? horarioAtualizado : horario,
    );

    return horarioAtualizado;
  }

  deletarHorario(id: number) {
    this.buscarPorId(id);

    this.horarios = this.horarios.filter((horario) => horario.id !== id);

    return {
      mensagem: `Horário com ID ${id} deletado com sucesso.`,
    };
  }
}
