import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServiceDto } from './dto/update-servico.dto';

@Controller('servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Get()
  listarServicos() {
    return this.servicosService.listarServicos();
  }

  @Post()
  cadastrarServico(@Body() createServicoDto: CreateServicoDto) {
    return this.servicosService.cadastrarServico(createServicoDto);
  }

  @Delete(':id')
  async deletarServico(@Param('id', new ParseIntPipe()) id: number) {
    return this.servicosService.deletarServico(id);
  }

  @Patch(':id')
  atualizarServico(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateServicoDto: UpdateServiceDto,
  ) {
    return this.servicosService.atualizarServico(id, updateServicoDto);
  }
}
