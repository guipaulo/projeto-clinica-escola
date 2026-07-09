import { IsEmail, IsIn, IsNotEmpty, MinLength } from 'class-validator';
import type { PerfilUsuario } from '../usuarios.service';

export class CriarUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty()
  @IsIn(['admin', 'profissional', 'aluno'], {
    message: 'Perfil inválido',
  })
  perfil: PerfilUsuario;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  senha: string;
}