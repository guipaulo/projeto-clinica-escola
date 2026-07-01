import { IsUUID, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateHorarioDto {
    @IsUUID('4', { message: 'O ID do profissional deve ser um UUID válido.' })
    @IsNotEmpty({ message: 'O profissional é obrigatório.' })
    profissionalId: string;

    @IsUUID('4', { message: 'O ID do serviço deve ser um UUID válido.' })
    @IsNotEmpty({ message: 'O serviço é obrigatório.' })
    servicoId: string;

    @IsDateString({}, { message: 'A data e hora de início devem estar no formato ISO válido.' })
    @IsNotEmpty({ message: 'A hora de início é obrigatória.' })
    horaInicio: string; 

    @IsDateString({}, { message: 'A data e hora de término devem estar no formato ISO válido.' })
    @IsNotEmpty({ message: 'A hora de término é obrigatória.' })
    horaFim: string; 

    @IsDateString({}, { message: 'A data deve estar no formato ISO válido.' })
    @IsNotEmpty({ message: 'A data é obrigatória.' })
    data: string;
}