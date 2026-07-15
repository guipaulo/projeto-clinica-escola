import {
  IsEmail,
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
} from 'class-validator';

// DTO para atualizar os dados de um profissional na clínica-escola
export class UpdateProfissionalDto {
  @IsOptional()
  @IsString()
  name?: string;

  // Adicionei a validação de e-mail para o campo 'email' no DTO de atualização do profissional
  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido.' })
  email?: string;

  // Adicionei a validação de string para o campo 'phone' no DTO de atualização do profissional
  @IsOptional()
  @IsString()
  phone?: string;

  // Adicionei a validação de string para o campo 'registryCard' no DTO de atualização do profissional
  @IsOptional()
  @IsString()
  registryCard?: string;

  // Adicionei a validação de array e número para o campo 'servicesIds' no DTO de atualização do profissional
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  servicesIds?: number[];

  // Adicionei a validação de string para o campo 'specialty' no DTO de atualização do profissional
  @IsOptional()
  @IsString()
  specialty?: string;
}
