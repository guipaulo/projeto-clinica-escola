import { Test, TestingModule } from '@nestjs/testing';
import { ServicosController } from './servicos.controller';
import { ServicosService } from './servicos.service';

describe('ServicosController', () => {
  let controller: ServicosController;
  let service: ServicosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicosController],
      providers: [ServicosService],
    }).compile();

    controller = module.get<ServicosController>(ServicosController);
    service = module.get<ServicosService>(ServicosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the registered services', async () => {
    await service.cadastrarServico({
      nome: 'Consulta',
      descricao: 'Atendimento clínico',
      duracaoEmMinutos: 30,
    });

    await expect(controller.listarServicos()).resolves.toEqual([
      expect.objectContaining({ nome: 'Consulta' }),
    ]);
  });
});
