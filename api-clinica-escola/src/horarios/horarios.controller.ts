import { Controller, Post, Body, Get, Delete, Query, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) { }

  @Get('disponiveis')
  listarDisponiveis(
    @Query('profissionalId', new ParseIntPipe({ optional: true })) profissionalId?: number,
    @Query('data') data?: string,
  ) {
    return this.horariosService.listarDisponiveis(profissionalId, data);
  }

  @Post('disponibilizar')
  disponibilizarServico(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horariosService.disponibilizarServico(createHorarioDto);
  }

  @Delete(':id')
  deletarServico(@Param('id', ParseIntPipe) id: number) {
    return this.horariosService.deletarServico(id);
  }

  @Patch(':id')
  atualizarStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHorarioDto: UpdateHorarioDto,
  ) {
    return this.horariosService.atualizarStatus(id, updateHorarioDto);
  }
}