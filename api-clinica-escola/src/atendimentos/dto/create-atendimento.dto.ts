import { IsInt, Min } from 'class-validator';

export class CreateAtendimentoDto {
  @IsInt()
  @Min(1)
  alunoId!: number;

  @IsInt()
  @Min(1)
  profissionalId!: number;

  @IsInt()
  @Min(1)
  servicoId!: number;

  @IsInt()
  @Min(1)
  horarioId!: number;
}
