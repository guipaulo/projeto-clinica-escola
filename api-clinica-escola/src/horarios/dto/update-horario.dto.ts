import { IsIn, IsOptional, Matches, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateHorarioDto {
        @Matches(/^([0-2]?[0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/\d{4}$/, { message: 'A data deve estar no formato DD/MM/AAAA (ex: 25/12/2026).' })
        @IsOptional()
        @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
        data?: string;

        @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'A hora de início deve estar no formato HH:MM (ex: 08:00).' })
        @IsOptional()
        horaInicio?: string;

        @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'A hora de término deve estar no formato HH:MM (ex: 17:30).' })
        @IsOptional()
        horaFim?: string;

        @IsNumber({}, { message: 'O ID do serviço deve ser um número válido.' })
        @IsOptional()
        servicoId?: number;

        @IsIn(['disponivel', 'indisponivel'], { message: 'O status deve ser "disponivel" ou "indisponivel"' })
        @IsOptional()
        status?: 'disponivel' | 'indisponivel';
}