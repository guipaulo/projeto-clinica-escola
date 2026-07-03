import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePacienteDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}