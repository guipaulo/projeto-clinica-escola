import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './modules/pacientes/pacientes.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';

@Module({
  imports: [PatientsModule, ProfessionalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
