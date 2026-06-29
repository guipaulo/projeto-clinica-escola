import { Controller, Post, Get, Patch, Param, Query } from '@nestjs/common';

@Controller('horarios')
export class HorariosController {
    @Post()
    criarHorario() {
        // Lógica para criar um novo horário
    }

    @Get('disponiveis')
    listarHorarios(@Query('servicoId') servicoId: string, @Query('data') data: string) {
        // Lógica para listar todos os horários
    }

    @Patch(':id/status')
    atualizarHorario(@Param('id') id: string) {
        // Lógica para atualizar um horário específico
    }
}
