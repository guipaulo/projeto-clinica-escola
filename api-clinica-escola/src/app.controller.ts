import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Controlador principal da aplicação, responsável por gerenciar os endpoints gerais
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Endpoint para retornar uma mensagem de saudação, utilizando o serviço principal da aplicação
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
