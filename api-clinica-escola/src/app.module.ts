import { Module } from '@nestjs/common';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';

@Module({
  imports: [AutenticacaoModule],
})
export class AppModule {}