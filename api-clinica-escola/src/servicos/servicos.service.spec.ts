import { Test, TestingModule } from '@nestjs/testing';
import { ServicosService } from './servicos.service';

describe('ServicosService', () => {
  let service: ServicosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicosService],
    }).compile();

    service = module.get<ServicosService>(ServicosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update an existing service with the provided data', async () => {
    const created = await service.cadastrarServico({
      nome: 'Consulta',
      descricao: 'Consulta inicial',
      duracao: 30,
    });

    const updated = await service.atualizarServico(created.id, {
      nome: 'Consulta Especial',
      descricao: 'Consulta especializada',
      duracao: 45,
    });

    expect(updated).toBeDefined();
    expect(updated?.nome).toBe('Consulta Especial');
    expect(updated?.descricao).toBe('Consulta especializada');
    expect(updated?.duracao).toBe(45);
  });

  it('should preserve existing values when the patch contains undefined fields', () => {
    const created = service.cadastrarServico({
      nome: 'Consulta',
      descricao: 'Consulta inicial',
      duracao: 30,
    });

    const updated = service.atualizarServico(created.id, {
      nome: 'Consulta Especial',
      descricao: undefined,
      duracao: undefined,
    });

    expect(updated.nome).toBe('Consulta Especial');
    expect(updated.descricao).toBe('Consulta inicial');
    expect(updated.duracao).toBe(30);
  });
});
