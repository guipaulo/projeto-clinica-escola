import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    credentials: true,
  });
   
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Clínica-Escola')
    .setDescription('Documentação dos endpoints para o gerenciamento de agendamentos da clínica.')
    .setVersion('1.0')
    .addTag('alunos')
    .addTag('profissionais')
    .addTag('servicos')
    .addTag('horarios')
    .addTag('atendimentos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(3000);
}

bootstrap();
