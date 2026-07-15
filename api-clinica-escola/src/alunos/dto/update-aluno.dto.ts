import { IsBoolean, IsOptional, IsString } from 'class-validator';

// DTO para atualizar os dados de um aluno na clínica-escola
export class UpdateAlunoDto {
  @IsOptional()
  @IsString()
  nome?: string;

  // Adicionei a validação de string para o campo 'telefone' no DTO de atualização do aluno
  @IsOptional()
  @IsString()
  telefone?: string;

  // Adicionei a validação de string para o campo 'email' no DTO de atualização do aluno
  @IsOptional()
  @IsString()
  email?: string;

  // Adicionei a validação de boolean para o campo 'ativo' no DTO de atualização do aluno
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
