import { IsNumber, IsString, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateServicoDto {
    @IsNotEmpty({ message: 'O nome do serviço é obrigatório.' })
    nome: string;

    @IsString()
    @IsOptional()
    descricao?: string;

    @IsNumber()
    @Min(15, { message: 'A duração mínima do serviço deve ser de 15 minutos.' })
    duracao: number;
}