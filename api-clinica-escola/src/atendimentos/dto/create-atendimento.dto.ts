import { IsString, IsIn, IsNotEmpty } from 'class-validator';

export class CreateAtendimentoDto {
    @IsString()
    @IsNotEmpty()
    aluno!: string;

    @IsString()
    @IsNotEmpty()
    profissional!: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['Medico', 'Enfermeiro', 'Psicologo', 'Odontologista'])
    especialidade!: 'Medico' | 'Enfermeiro' | 'Psicologo' | 'Odontologista';
}