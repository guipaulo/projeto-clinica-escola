import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateServiceDto  {
    @IsString()
    @IsOptional()
    nome?: string;

    @IsString()
    @IsOptional()
    descricao?: string;

    @IsNumber()
    @IsOptional()
    duracao?: number;
}