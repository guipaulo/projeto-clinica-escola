export class Horario {
  id: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  servicoId: string;
  profissionalId: string;
  pacienteId?: string;
  status: 'disponivel' | 'agendado' | 'cancelado';
}