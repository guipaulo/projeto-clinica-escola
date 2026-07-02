import { Test, TestingModule } from '@nestjs/testing';
import { AutenticacaoController } from './autenticacao.controller';

describe('AutenticacaoController', () => {
  let controller: AutenticacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutenticacaoController],
    }).compile();

    controller = module.get<AutenticacaoController>(AutenticacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
