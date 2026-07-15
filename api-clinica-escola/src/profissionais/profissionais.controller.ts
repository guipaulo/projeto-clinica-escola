import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  HttpCode
} from '@nestjs/common';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';
import { FiltroProfissionalDto } from './dto/filtro-profissional.dto';
import { ProfissionaisService } from './profissionais.service';

// Controlador para gerenciar os endpoints relacionados aos profissionais na clínica-escola
@Controller('profissionais')
export class ProfissionaisController {
  constructor(private readonly profissionaisService: ProfissionaisService) {}

  // Controlador para listar todos os profissionais, utilizando o serviço de profissionais
  @Get()
  listar(@Query() filtros: FiltroProfissionalDto) {
    return this.profissionaisService.listar(filtros);
  }

  // Controlador para buscar um profissional pelo ID, utilizando o serviço de profissionais
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.profissionaisService.buscarPorId(id);
  }

  // Controlador para criar um novo profissional, utilizando o serviço de profissionais
  @Post()
  criar(@Body() body: CreateProfissionalDto) {
    return this.profissionaisService.criar(body);
  }

  // Controlador para atualizar parcialmente os dados de um profissional pelo ID, utilizando o serviço de profissionais
  @Patch(':id')
  atualizarParcial(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProfissionalDto,
  ) {
    return this.profissionaisService.atualizarParcial(id, body);
  }

  // Controlador para remover um profissional pelo ID, utilizando o serviço de profissionais
  @Delete(':id')
  @HttpCode(204)
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.profissionaisService.remover(id);
  }
}
