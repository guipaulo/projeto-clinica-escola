import { Controller, Post, Get, Put, Delete, Param, Body, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServiceDto } from './dto/update-servico.dto';

@Controller('servicos')
export class ServicosController {
    constructor(private readonly servicosService: ServicosService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async cadastrarServico(@Body() createServicoDto: CreateServicoDto) {
        return this.servicosService.cadastrarServico(createServicoDto);
    }

    @Get()
    async listarServicos() {
        return this.servicosService.listarServicos();
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    async atualizarServico(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateServicoDto: UpdateServiceDto,
    ) {
        return this.servicosService.atualizarServico(id, updateServicoDto);
    }

    @Delete(':id')
    async deletarServico(@Param('id', new ParseIntPipe()) id: number) {
        return this.servicosService.deletarServico(id);
    }
}
