import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { AlunosModule } from '../alunos/alunos.module';
import { ProfissionaisModule } from '../profissionais/profissionais.module';

@Module({
  imports: [
    AlunosModule,
    ProfissionaisModule,
  ],  
  providers: [UsuariosService],
  exports: [UsuariosService],
  controllers: [UsuariosController],
})
export class UsuariosModule {}