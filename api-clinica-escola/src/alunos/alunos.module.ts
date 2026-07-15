import { Module } from '@nestjs/common';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';

// Módulo para gerenciar os alunos na clínica-escola, incluindo o controlador e o serviço
@Module({
  controllers: [AlunosController],
  providers: [AlunosService],
  exports: [AlunosService], // Exporta para que outros módulos (como o de Atendimentos) possam usar depois
})
export class AlunosModule {}
