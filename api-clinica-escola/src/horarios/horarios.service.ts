import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

type Horario = {
  id: number;
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
      data: '10/07/2026',
      horaInicio: '08:00',
      horaFim: '09:00',
      status: 'disponivel',
    },
    {
      id: 2,
      data: '10/08/2026',
      horaInicio: '09:00',
      horaFim: '10:00',
      status: 'disponivel',
    },
    {
      id: 3,
      data: '10/09/2026',
      horaInicio: '14:00',
      horaFim: '15:00',
      status: 'disponivel',
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
      throw new BadRequestException(
        'A hora de término deve ser posterior à hora de início.',
      );
    }

    if (dataDigitada < dataAtual) {
      throw new BadRequestException(
        'A data do horário não pode ser anterior à data atual.',
      );
    }

    const horarioDuplicado = this.horarios.find(
      (horario) =>
        horario.data === createHorarioDto.data &&
        horario.horaInicio === createHorarioDto.horaInicio &&
        horario.horaFim === createHorarioDto.horaFim,
    );

    if (horarioDuplicado) {
      throw new BadRequestException(
        'Este serviço já possui esse horário cadastrado nesta data.',
      );
    }

    const novoId =
      this.horarios.length > 0
        ? Math.max(...this.horarios.map((horario) => horario.id)) + 1
        : 1;

    const novoHorario: Horario = {
      id: novoId,
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
        throw new BadRequestException(
          'A data do horário não pode ser anterior à data atual.',
        );
      }
    }

    const horaInicio = updateHorarioDto.horaInicio ?? horarioAtual.horaInicio;

    const horaFim = updateHorarioDto.horaFim ?? horarioAtual.horaFim;

    const horaInicioNum = Number(horaInicio.replace(':', ''));
    const horaFimNum = Number(horaFim.replace(':', ''));

    if (horaInicioNum >= horaFimNum) {
      throw new BadRequestException(
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
