import { IsEmail, IsNotEmpty, IsString, IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateProfissionalDto {
  // Validação básica do nome do profissional
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name!: string;

  // Validação do e-mail corporativo do profissional
  @IsEmail({}, { message: 'E-mail inválido.' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  phone!: string;

  // Exigência do número do conselho ou registo profissional (ex: CRM, CRP) para a clínica-escola
  @IsString()
  @IsNotEmpty({ message: 'O registo profissional é obrigatório.' })
  registryCard!: string;

  // Alterado para number[] e adicionada a validação de números
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  servicesIds!: number[];

  // Adicionei a validação de string para o campo 'especialidade' no DTO de criação do profissional
  @IsString()
  @IsNotEmpty({ message: 'A especialidade é obrigatória.' })
  especialidade!: string; 
}
