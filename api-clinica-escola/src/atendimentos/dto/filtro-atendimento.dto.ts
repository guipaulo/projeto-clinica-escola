import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FiltroAtendimentoDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  alunoId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  profissionalId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  servicoId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  horarioId?: number;

  @IsOptional()
  @IsIn(['Agendado', 'Concluido', 'Cancelado'])
  status?: 'Agendado' | 'Concluido' | 'Cancelado';
}