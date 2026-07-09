import { IsNumber, IsNotEmpty, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateHorarioDto {
    @Matches(/^([0-2]?[0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/\d{4}$/, { message: 'A data deve estar no formato DD/MM/AAAA (ex: 25/12/2026).' })
    @IsNotEmpty({ message: 'A data é obrigatória.' })
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    data: string;

    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'A hora de início deve estar no formato HH:MM (ex: 08:00).' })
    @IsNotEmpty({ message: 'A hora de início é obrigatória.' })
    horaInicio: string;

    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'A hora de término deve estar no formato HH:MM (ex: 17:30).' })
    @IsNotEmpty({ message: 'A hora de término é obrigatória.' })
    horaFim: string;

    @IsNumber({}, { message: 'O ID do serviço deve ser um número válido.' })
    @IsNotEmpty({ message: 'O serviço é obrigatório.' })
    servicoId: number;
}