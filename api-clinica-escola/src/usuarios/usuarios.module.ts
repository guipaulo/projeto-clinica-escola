import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

@Module({
  providers: [UsuariosService],
  exports: [UsuariosService],
  controllers: [UsuariosController],
})
export class UsuariosModule {}