import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const defaultCorsOrigins = 'http://localhost:5500,http://127.0.0.1:5500';
  const corsOrigins = (process.env.CORS_ORIGIN ?? defaultCorsOrigins)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: corsOrigins, 
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

const document = SwaggerModule.createDocument(app as any, config);
SwaggerModule.setup('api', app as any, document);

  const port = Number(process.env.PORT ?? 3000);

  await app.listen(port, '0.0.0.0');
}

bootstrap();