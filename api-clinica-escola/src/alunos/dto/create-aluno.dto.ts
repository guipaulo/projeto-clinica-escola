import { IsBoolean, IsNotEmpty, IsString, IsOptional } from 'class-validator';

// DTO para criar um novo aluno na clínica-escola
export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  telefone!: string;

  // Adicionei email como opcional, por ser comum em cadastros
  @IsOptional()
  @IsString()
  email?: string;

  // Adicionei o campo 'ativo' para indicar se o aluno está ativo ou não na clínica-escola
  @IsBoolean()
  ativo!: boolean;
}
