import { Body, Controller, Post } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AutenticacaoController {
  constructor(private readonly authService: AutenticacaoService) {}

  @Post('login')
  login(@Body() dados: LoginDto) {
    return this.authService.login(dados);
  }
}