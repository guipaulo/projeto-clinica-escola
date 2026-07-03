import { IsOptional, IsString, IsIn, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateAtendimentoDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    aluno?: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    profissional?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsIn(['Medico', 'Enfermeiro', 'Psicologo', 'Odontologista'])
    especialidade?: 'Medico' | 'Enfermeiro' | 'Psicologo' | 'Odontologista';

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsIn(['Agendado', 'Concluido', 'Cancelado'])
    status?: 'Agendado' | 'Concluido' | 'Cancelado';
}