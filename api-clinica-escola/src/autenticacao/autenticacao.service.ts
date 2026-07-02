import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AutenticacaoService {
  login(dados: LoginDto) {
    if (dados.email === 'teste@email.com' && dados.senha === '123456') {
      return { mensagem: 'Login válido' };
    }

    return { mensagem: 'Credenciais inválidas' };
  }
}