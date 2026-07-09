import { Controller, Post, Body, Get, Delete, Query, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) { }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.horariosService.buscarPorId(id);
  }

  @Get('disponiveis')
  listarHorariosDisponiveis(
    @Query('servicoId', ParseIntPipe) servicoId?: number,
    @Query('data') data?: string,
  ) {
    return this.horariosService.listarHorariosDisponiveis(servicoId, data);
  }

  @Post('disponibilizar')
  disponibilizarHorario(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horariosService.disponibilizarHorario(createHorarioDto);
  }

  @Delete(':id')
  deletarHorario(@Param('id', ParseIntPipe) id: number) {
    return this.horariosService.deletarHorario(id);
  }

  @Patch(':id')
  atualizarHorario(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHorarioDto: UpdateHorarioDto,
  ) {
    return this.horariosService.atualizarHorario(id, updateHorarioDto);
  }
}