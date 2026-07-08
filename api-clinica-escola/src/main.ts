import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
// Validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove campos que não estão no DTO
    forbidNonWhitelisted: true, // Retorna erro 400 se enviar campo a mais
    transform: true, // Transforma os dados para os tipos corretos
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();