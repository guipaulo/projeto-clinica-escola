import {IsEmail, IsIn, IsOptional, MinLength, } from 'class-validator';
import type { PerfilUsuario } from '../usuarios.service';

export class UpdateUsuarioDto {
  @IsOptional()
  nome?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  email?: string;

  @IsOptional()
  @IsIn(['admin', 'aluno', 'profissional'], {
    message: 'Perfil inválido',
  })
  perfil?: PerfilUsuario;

  @IsOptional()
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  senha?: string;

  @IsOptional()
  ativo?: boolean;
}