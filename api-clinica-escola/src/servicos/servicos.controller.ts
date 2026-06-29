import { Controller, Post, Get, Put, Delete, Param, Body, UsePipes, ValidationPipe} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';

@Controller('servicos')
export class ServicosController {
    constructor(private readonly servicosService: ServicosService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async cadastrarServico(@Body() createServicoDto: CreateServicoDto) {
        return this.servicosService.cadastrarServico(createServicoDto);
    }
    
    @Get()
    listarServicos() {
        // Lógica para listar os serviços
    }

    @Put(':id')
    atualizarServico(@Param('id') id: string) {
        // Lógica para atualizar um serviço específico
    }

    @Delete(':id')
    deletarServico(@Param('id') id: string) {
        // Lógica para deletar um serviço específico
    }
}
