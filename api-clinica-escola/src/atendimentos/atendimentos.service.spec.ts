import { Test, TestingModule } from '@nestjs/testing';
import { AtendimentosService } from './atendimentos.service';

describe('AtendimentosService', () => {
  let service: AtendimentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtendimentosService],
    }).compile();

    service = module.get<AtendimentosService>(AtendimentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
