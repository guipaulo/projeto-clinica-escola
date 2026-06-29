import { IsNumber, IsString, IsNotEmpty, IsInt, Min, IsOptional } from 'class-validator';

export class CreateServicoDto {
    @IsNumber()
    @IsNotEmpty({ message: 'O nome do serviço é obrigatório.' })
    nome: string;

    @IsString()
    @IsOptional()
    descricao?: string;

    @IsInt()
    @Min(15, { message: 'A duração mínima do serviço deve ser de 15 minutos.' })
    duracaoEmMinutos: number;
}