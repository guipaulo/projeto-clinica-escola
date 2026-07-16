import { Module } from '@nestjs/common';
import { ProfissionaisService } from './profissionais.service';
import { ProfissionaisController } from './profissionais.controller';
import { ServicosModule } from '../servicos/servicos.module';


@Module({
  controllers: [ProfissionaisController],
  providers: [ProfissionaisService],
  exports: [ProfissionaisService],
  imports: [ServicosModule],
})
export class ProfissionaisModule {}
