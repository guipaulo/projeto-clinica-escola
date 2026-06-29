import { Controller, Post, Get, Put, Delete, Param} from '@nestjs/common';

@Controller('servicos')
export class ServicosController {
    @Post()
    cadastrarServico() {
        // Lógica para cadastrar um serviço
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
