import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  HttpCode
} from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { AlunosService } from './alunos.service';

// Controlador para gerenciar os endpoints relacionados aos alunos na clínica-escola
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  // Controlador para listar todos os alunos, utilizando o serviço de alunos
  @Get()
  listar() {
    return this.alunosService.listar();
  }

  // Controlador para buscar um aluno pelo ID, utilizando o serviço de alunos
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.alunosService.buscarPorId(id);
  }

  // Controlador para criar um novo aluno, utilizando o serviço de alunos
  @Post()
  criar(@Body() body: CreateAlunoDto) {
    return this.alunosService.criar(body);
  }

  // Controlador para atualizar parcialmente os dados de um aluno pelo ID, utilizando o serviço de alunos
  @Patch(':id')
  atualizarParcial(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAlunoDto,
  ) {
    return this.alunosService.atualizarParcial(id, body);
  }

  // Controlador para remover um aluno pelo ID, utilizando o serviço de alunos
  @Delete(':id')
  @HttpCode(204)
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.alunosService.remover(id);
  }
}
