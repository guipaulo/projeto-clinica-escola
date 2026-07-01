import { Controller, Post, Body, Get, Query, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  @Post('disponibilizar')
  async disponibilizar(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horariosService.disponibilizar(createHorarioDto);
  }

  @Get('disponiveis')
  async listarDisponiveis(@Query('profissionalId', ParseIntPipe) profissionalId?: number) {
    return this.horariosService.listarDisponiveis(profissionalId);
  }

  @Patch(':id/status')
  async atualizarStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateHorarioDto,
  ) {
    return this.horariosService.atualizarStatus(id, updateStatusDto);
  }
}