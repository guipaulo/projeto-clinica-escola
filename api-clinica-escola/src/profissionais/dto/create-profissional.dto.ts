import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateProfissionalDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name!: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  phone!: string;

  @IsString()
  @IsNotEmpty({ message: 'O registo profissional é obrigatório.' })
  registryCard!: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  servicesIds!: number[];

  @IsString()
  @IsNotEmpty({ message: 'A especialidade é obrigatória.' })
  specialty!: string;
}
