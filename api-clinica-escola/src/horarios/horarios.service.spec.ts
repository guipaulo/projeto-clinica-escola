import { Test, TestingModule } from '@nestjs/testing';
import { HorariosService } from './horarios.service';

describe('HorariosService', () => {
  let service: HorariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorariosService],
    }).compile();

    service = module.get<HorariosService>(HorariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should preserve existing values when the patch contains undefined fields', () => {
    const created = service.disponibilizarServico({
      profissionalId: 1,
      horaInicio: '08:00',
      horaFim: '09:00',
    });

    const updated = service.atualizarStatus(created.id, {
      status: 'ocupado',
      horaInicio: undefined as never,
      horaFim: undefined as never,
      profissionalId: undefined as never,
    });

    expect(updated.status).toBe('ocupado');
    expect(updated.horaInicio).toBe('08:00');
    expect(updated.horaFim).toBe('09:00');
    expect(updated.profissionalId).toBe(1);
  });

  it('should reject a create with end time less than or equal to start time', () => {
    expect(() => service.disponibilizarServico({
      profissionalId: 1,
      horaInicio: '09:00',
      horaFim: '09:00',
    })).toThrow('A hora de término deve ser posterior à hora de início.');
  });

  it('should reject an update with end time less than or equal to start time', () => {
    const created = service.disponibilizarServico({
      profissionalId: 1,
      horaInicio: '08:00',
      horaFim: '09:00',
    });

    expect(() => service.atualizarStatus(created.id, {
      horaInicio: '10:00',
      horaFim: '09:00',
    })).toThrow('A hora de término deve ser posterior à hora de início.');
  });
});
