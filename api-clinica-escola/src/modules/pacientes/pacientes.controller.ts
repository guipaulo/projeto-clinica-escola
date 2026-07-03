import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PacientesService } from './pacientes.service';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  listar() {
    return this.pacientesService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.buscarPorId(id);
  }

  @Post()
  criar(@Body() body: CreatePacienteDto) {
    return this.pacientesService.criar(body);
  }

  @Patch(':id')
  atualizarParcial(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePacienteDto,
  ) {
    return this.pacientesService.atualizarParcial(id, body);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.remover(id);
  }
}