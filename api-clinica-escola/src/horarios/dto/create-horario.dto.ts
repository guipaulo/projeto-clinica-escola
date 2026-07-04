import { IsNumber, IsNotEmpty, Matches, IsIn } from 'class-validator';

export class CreateHorarioDto {
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'A hora de início deve estar no formato HH:MM (ex: 08:00).' })
    @IsNotEmpty({ message: 'A hora de início é obrigatória.' })
    horaInicio: string; 

    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'A hora de término deve estar no formato HH:MM (ex: 17:30).' })
    @IsNotEmpty({ message: 'A hora de término é obrigatória.' })
    horaFim: string; 

    @IsNumber({}, { message: 'O ID do profissional deve ser um número válido.' })
    @IsNotEmpty({ message: 'O profissional é obrigatório.' })
    profissionalId: number;
}