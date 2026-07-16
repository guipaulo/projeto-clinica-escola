import { Module } from '@nestjs/common';
import { PreferenciasController } from './preferencias.controller';

@Module({
  controllers: [PreferenciasController],
})
export class PreferenciasModule {}