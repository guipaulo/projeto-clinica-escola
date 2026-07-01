import { PartialType } from '@nestjs/mapped-types';
import { CreateServicoDto } from './create-servico.dto';

export class UpdateServiceDto extends PartialType(CreateServicoDto) {}