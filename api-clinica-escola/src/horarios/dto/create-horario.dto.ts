import { IsNumber, IsNotEmpty, Matches } from 'class-validator';

export class CreateHorarioDto {
    @IsNumber({}, { message: 'O ID do profissional deve ser um número válido.' })
    @IsNotEmpty({ message: 'O profissional é obrigatório.' })
    profissionalId: number;

    @IsNumber({}, { message: 'O ID do serviço deve ser um número válido.' })
    @IsNotEmpty({ message: 'O serviço é obrigatório.' })
    servicoId: number;

    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'A hora de início deve estar no formato HH:MM (ex: 08:00).' })
    @IsNotEmpty({ message: 'A hora de início é obrigatória.' })
    horaInicio: string; 

    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'A hora de término deve estar no formato HH:MM (ex: 17:30).' })
    @IsNotEmpty({ message: 'A hora de término é obrigatória.' })
    horaFim: string; 
    
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, { message: 'A data deve estar no formato válido (DD/MM/AAAA).' })
    @IsNotEmpty({ message: 'A data é obrigatória.' })
    data: string;
}