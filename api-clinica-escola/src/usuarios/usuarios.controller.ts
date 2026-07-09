import {Body, Controller, Get, Param, ParseIntPipe, Post, Patch, UseGuards,} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Roles } from 'src/autenticacao/decorators/roles.decorator';
import { JwtAuthGuard } from '../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../autenticacao/guards/roles.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  criar(@Body() dados: CriarUsuarioDto) {
    return this.usuariosService.criar(dados);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  listar() {
    return this.usuariosService.listar();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  buscarPorId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usuariosService.buscarPorId(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: UpdateUsuarioDto,
  ) {
    return this.usuariosService.atualizar(id, dados);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/inativar')
  inativar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usuariosService.inativar(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/reativar')
  reativar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usuariosService.reativar(id);
  }
}