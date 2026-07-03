import { IsEmail, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateProfessionalDto {
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

  // Aqui eu exijo o número do conselho ou registro profissional (ex: CRM, CRP) para a clínica-escola
  @IsString()
  @IsNotEmpty({ message: 'O registro profissional é obrigatório.' })
  registryCard!: string;

  // Responsabilidade da minha parte: eu defini este campo como um array de strings (IsArray) 
  // para vincular os IDs dos serviços que este profissional está apto a realizar na clínica
  @IsArray()
  servicesIds!: string[]; 
}