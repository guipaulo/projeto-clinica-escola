import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { Roles } from 'src/autenticacao/decorators/roles.decorator';
import { JwtAuthGuard } from '../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../autenticacao/guards/roles.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

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
}