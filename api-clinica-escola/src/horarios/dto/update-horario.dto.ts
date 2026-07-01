import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateHorarioDto {
    @IsNotEmpty({ message: 'O novo status é obrigatório.' })
    @IsIn(['disponivel', 'reservado', 'cancelado'], {
        message: 'O status deve ser: disponivel, reservado ou cancelado.',
    })
    status: 'disponivel' | 'reservado' | 'cancelado';
}