import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from '../autenticacao/guards/jwt-auth.guard';
import { PreferenciaPaginacaoDto } from './dto/preferencia-paginacao.dto';

@UseGuards(JwtAuthGuard)
@Controller('preferencias')
export class PreferenciasController {
  @Post('paginacao')
  salvarPaginacao(
    @Body() body: PreferenciaPaginacaoDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.cookie(
      'itensPorPagina',
      String(body.itensPorPagina),
      {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      },
    );

    return {
      mensagem: 'Preferência salva com sucesso.',
      itensPorPagina: body.itensPorPagina,
    };
  }

  @Get('paginacao')
  buscarPaginacao(@Req() request: Request) {
    const valor = Number(request.cookies?.itensPorPagina);
    const valoresPermitidos = [8, 16, 24];

    return {
      itensPorPagina: valoresPermitidos.includes(valor)
        ? valor
        : 8,
    };
  }
}