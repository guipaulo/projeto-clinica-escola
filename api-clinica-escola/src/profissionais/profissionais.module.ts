import { Module } from '@nestjs/common';
import { ProfissionaisController } from './profissionais.controller';
import { ProfissionaisService } from './profissionais.service';

// Módulo para gerenciar os profissionais na clínica-escola, incluindo o controlador e o serviço
@Module({
  controllers: [ProfissionaisController],
  providers: [ProfissionaisService],
  exports: [ProfissionaisService], // Isso permite que outros módulos usem o serviço se precisarem
})
export class ProfissionaisModule {} // Repare no nome exato que o app.module procura!