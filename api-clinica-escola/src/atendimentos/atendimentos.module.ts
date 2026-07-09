import { Module } from '@nestjs/common';
import { AtendimentosService } from './atendimentos.service';
import { AtendimentosController } from './atendimentos.controller';
import { AlunosModule } from '../alunos/alunos.module';
import { ProfissionaisModule } from '../profissionais/profissionais.module';
import { HorariosModule } from '../horarios/horarios.module';
import { ServicosModule } from '../servicos/servicos.module';

@Module({
  imports: [
    AlunosModule,
    ProfissionaisModule,
    HorariosModule,
    ServicosModule,
  ],
  controllers: [AtendimentosController],
  providers: [AtendimentosService],
})
export class AtendimentosModule { }