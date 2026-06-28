import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtendimentosModule } from './atendimentos/atendimentos.module';

@Module({
  imports: [AtendimentosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
