import { Module } from '@nestjs/common';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';

@Module({
  controllers: [PacientesController],
  providers: [PacientesService],
  exports: [PacientesService], // Exportamos para que outros módulos (como o de Atendimentos) possam usar depois!
})
export class PacientesModule {}