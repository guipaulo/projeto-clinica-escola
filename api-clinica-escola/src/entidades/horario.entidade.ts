export class Horario {
  id: number;
  data: string;
  horaInicio: string;
  horaFim: string;
  servicoId: number;
  profissionalId: number;
  pacienteId?: number;
  status: 'disponivel' | 'agendado' | 'cancelado';
}