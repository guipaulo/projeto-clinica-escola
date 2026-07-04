import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';

// Módulo principal da aplicação, responsável por importar os módulos de alunos e profissionais, além de gerenciar o controlador e o serviço principal
@Module({
  imports: [AlunosModule, ProfissionaisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
