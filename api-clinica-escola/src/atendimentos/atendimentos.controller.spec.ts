import { Test, TestingModule } from '@nestjs/testing';
import { AtendimentosController } from './atendimentos.controller';

describe('AtendimentosController', () => {
  let controller: AtendimentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtendimentosController],
    }).compile();

    controller = module.get<AtendimentosController>(AtendimentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
