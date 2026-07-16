import { IsIn } from 'class-validator';

export class PreferenciaPaginacaoDto {
  @IsIn([8, 16, 24], {
    message: 'A quantidade deve ser 8, 16 ou 24.',
  })
  itensPorPagina!: number;
}
