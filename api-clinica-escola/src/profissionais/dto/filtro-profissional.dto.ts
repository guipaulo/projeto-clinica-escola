import { IsOptional, IsString } from 'class-validator';

export class FiltroProfissionalDto {
  @IsOptional()
  @IsString()
  nome?: string; //

  @IsOptional()
  @IsString()
  especialidade?: string;
}
