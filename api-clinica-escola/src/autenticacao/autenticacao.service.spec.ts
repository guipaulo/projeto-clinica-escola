import { Test, TestingModule } from '@nestjs/testing';
import { AutenticacaoService } from './autenticacao.service';

describe('AutenticacaoService', () => {
  let service: AutenticacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutenticacaoService],
    }).compile();

    service = module.get<AutenticacaoService>(AutenticacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
