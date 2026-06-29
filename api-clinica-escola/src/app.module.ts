import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicosModule } from './servicos/servicos.module';
import { HorariosModule } from './horarios/horarios.module';

@Module({
  imports: [ServicosModule, HorariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
