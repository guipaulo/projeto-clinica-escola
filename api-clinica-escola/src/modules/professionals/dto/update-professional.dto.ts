import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalDto } from './create-professional.dto';

// Aqui eu utilizo o PartialType do NestJS para reaproveitar todas as validações
// do CreateProfessionalDto, mas definindo automaticamente todos os campos como opcionais para a atualização.
export class UpdateProfessionalDto extends PartialType(CreateProfessionalDto) {}