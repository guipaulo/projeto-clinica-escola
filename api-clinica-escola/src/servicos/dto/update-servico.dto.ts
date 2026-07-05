import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

export class UpdateServiceDto {
    @IsIn(
        ['Atendimento Médico', 'Atendimento Psicológico', 'Atendimento Odontológico', 'Atendimento de Enfermagem'],
        { message: 'O nome do serviço deve ser: Atendimento Médico, Psicológico, Odontológico ou de Enfermagem.' })
    @IsOptional()
    nome?: 'Atendimento Médico' | 'Atendimento Psicológico' | 'Atendimento Odontológico' | 'Atendimento de Enfermagem';

    @IsString()
    @IsOptional()
    descricao?: string;

    @IsNumber()
    @IsOptional()
    duracao?: number;
}