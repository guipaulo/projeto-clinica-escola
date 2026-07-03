import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';

@Controller('professionals')
export class ProfessionalsController {
  // Injeto o serviço de profissionais para gerenciar os dados da clínica-escola
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Post()
  criar(@Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalsService.criar(createProfessionalDto);
  }

  @Get()
  listarTodos() {
    return this.professionalsService.listarTodos();
  }

  @Get(':id')
  buscarUm(@Param('id') id: string) {
    return this.professionalsService.buscarUm(id);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() updateProfessionalDto: any) {
    return this.professionalsService.atualizar(id, updateProfessionalDto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.professionalsService.remover(id);
  }
}