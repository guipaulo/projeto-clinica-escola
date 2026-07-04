import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import type { PerfilUsuario } from '../usuarios.service';

export class CriarUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  perfil: PerfilUsuario;

  @IsNotEmpty()
  @MinLength(6)
  senha: string;
}