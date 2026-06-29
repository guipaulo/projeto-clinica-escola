import { Test, TestingModule } from '@nestjs/testing';
import { ServicosController } from './servicos.controller';

describe('ServicosController', () => {
  let controller: ServicosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicosController],
    }).compile();

    controller = module.get<ServicosController>(ServicosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
