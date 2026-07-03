import { Controller, Get, Post, Patch, Body, Param, ParseIntPipe, Delete, HttpCode } from '@nestjs/common';
import { AtendimentosService } from './atendimentos.service';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';

@Controller('atendimentos')
export class AtendimentosController {
    constructor(private readonly atendimentosService: AtendimentosService) { }

    @Get()
    listar() {
        return this.atendimentosService.listarAtendimentos();
    }

    @Get(':id')
    buscarPorId(@Param('id', ParseIntPipe) id: number) {
        return this.atendimentosService.buscarPorId(id);
    }

    @Post()
    criar(@Body() body: CreateAtendimentoDto) {
        return this.atendimentosService.criarAtendimento(body);
    }

    @Patch(':id')
    atualizarParcial(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateAtendimentoDto) {
        return this.atendimentosService.atualizarAtendimento(id, body);
    }

    @Delete(':id')
    @HttpCode(204)
    remover(@Param('id', ParseIntPipe) id: number) {
        this.atendimentosService.removerAtendimento(id);
    }
}
