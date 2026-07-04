import { IsIn, IsOptional, Matches, IsNumber } from 'class-validator';

export class UpdateHorarioDto {
        @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'A hora de início deve estar no formato HH:MM (ex: 08:00).' })
        @IsOptional()
        horaInicio?: string; 
    
        @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'A hora de término deve estar no formato HH:MM (ex: 17:30).' })
        @IsOptional()
        horaFim?: string; 
    
        @IsNumber({}, { message: 'O ID do profissional deve ser um número válido.' })
        @IsOptional()
        profissionalId?: number;
    
        @IsIn(['disponivel', 'indisponivel', 'ocupado'], { message: 'O status deve ser "disponivel", "indisponivel" ou "ocupado".' })
        @IsOptional()
        status?: 'disponivel' | 'indisponivel' | 'ocupado';
}