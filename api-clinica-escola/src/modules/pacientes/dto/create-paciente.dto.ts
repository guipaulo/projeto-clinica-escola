import { IsBoolean, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  // Adicionei email como opcional, pois é comum em cadastros
  @IsOptional()
  @IsString()
  email?: string;

  @IsBoolean()
  ativo: boolean;
}