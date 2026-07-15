import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { ServicosModule } from './servicos/servicos.module';
import { HorariosModule } from './horarios/horarios.module';
import { AtendimentosModule } from './atendimentos/atendimentos.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
// Módulo principal da aplicação, responsável por importar os módulos de alunos e profissionais, além de gerenciar o controlador e o serviço principal
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AlunosModule,
    ProfissionaisModule,
    ServicosModule,
    HorariosModule,
    AtendimentosModule,
    AutenticacaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
