import { Module } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsController } from './professionals.controller';

@Module({
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService],
  exports: [ProfessionalsService], // Exportado para que o módulo de agendamentos consiga validar o profissional futuramente
})
export class ProfessionalsModule {}