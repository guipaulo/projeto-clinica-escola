import { IsNumber, IsString, IsOptional, Min, IsIn } from 'class-validator';

export class CreateServicoDto {
  @IsIn(
    [
      'Atendimento Médico',
      'Atendimento Psicológico',
      'Atendimento Odontológico',
      'Atendimento de Enfermagem',
    ],
    {
      message:
        'O nome do serviço deve ser: Atendimento Médico, Psicológico, Odontológico ou de Enfermagem.',
    },
  )
  nome!:
    | 'Atendimento Médico'
    | 'Atendimento Psicológico'
    | 'Atendimento Odontológico'
    | 'Atendimento de Enfermagem';

  @IsString({ message: 'A descrição deve ser um texto válido.' })
  @IsOptional()
  descricao?: string;

  @IsNumber({}, { message: 'A duração deve ser um número.' })
  @Min(15, { message: 'A duração mínima do serviço deve ser de 15 minutos.' })
  duracao!: number;
}
