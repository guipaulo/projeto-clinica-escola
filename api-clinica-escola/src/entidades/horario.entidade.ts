export class Horario {
  id: number;
  horaInicio: string;
  horaFim: string;
  profissionalId: number;
  status: 'disponivel' | 'indisponivel' | 'ocupado';
}