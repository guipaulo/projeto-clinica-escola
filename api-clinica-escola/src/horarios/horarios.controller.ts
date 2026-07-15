import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Query,
  Patch,
  Param,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  @Get()
  listar() {
    return this.horariosService.listarHorarios();
  }

  @Get('disponiveis')
  listarHorariosDisponiveis(@Query('data') data?: string,) {
    return this.horariosService.listarHorariosDisponiveis(data);
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.horariosService.buscarPorId(id);
  }

  @Post('disponibilizar')
  disponibilizarHorario(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horariosService.disponibilizarHorario(createHorarioDto);
  }

  @Patch(':id')
  atualizarHorario(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHorarioDto: UpdateHorarioDto,
  ) {
    return this.horariosService.atualizarHorario(id, updateHorarioDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deletarHorario(@Param('id', ParseIntPipe) id: number) {
    return this.horariosService.deletarHorario(id);
  }
}
