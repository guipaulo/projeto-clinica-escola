import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';
import { FiltroProfissionalDto } from './dto/filtro-profissional.dto';
import { ServicosService } from '../servicos/servicos.service';
import type { UsuarioSemSenha } from '../usuarios/usuarios.service';

type Profissional = {
  id: number;
  name: string;
  email: string;
  phone: string;
  registryCard: string;
  specialty: string;
  servicesIds: number[];
  ativo: boolean;
};

@Injectable()
export class ProfissionaisService {
  constructor(
    private readonly servicosService: ServicosService,
  ) {}

  private profissionais: Profissional[] = [
    {
      id: 1,
      name: 'Dra. Ana Costa',
      email: 'ana@email.com',
      phone: '1199999999',
      registryCard: 'COREN123',
      specialty: 'Enfermagem',
      servicesIds: [4],
      ativo: true,
    },
    {
      id: 2,
      name: 'Dr. Carlos Azevedo',
      email: 'carlos@email.com',
      phone: '1188888888',
      registryCard: 'CRP456',
      specialty: 'Psicologia',
      servicesIds: [2],
      ativo: true,
    },
    {
      id: 3,
      name: 'Dra. Maria Chaves',
      email: 'mariachaves@email.com',
      phone: '1177777777',
      registryCard: 'CRM789',
      specialty: 'Medicina',
      servicesIds: [1],
      ativo: true,
    },
    {
      id: 4,
      name: 'Dr. Daniel Silva',
      email: 'danielsilva@email.com',
      phone: '11999999999',
      registryCard: 'CRO573',
      specialty: 'Odontologia',
      servicesIds: [3],
      ativo: true,
    },
    {
      id: 5,
      name: 'Jose Henrique',
      email: 'jose@example.com',
      phone: '',
      registryCard: '',
      specialty: '',
      servicesIds: [],
      ativo: true,
    },
  ];

  listar(filtros?: FiltroProfissionalDto) {
    let resultado = [...this.profissionais];

    if (filtros) {
      const { nome, especialidade } = filtros;

      if (nome) {
        resultado = resultado.filter((p) =>
          p.name.toLowerCase().includes(nome.toLowerCase()),
        );
      }

      if (especialidade) {
        resultado = resultado.filter((p) =>
          p.specialty.toLowerCase().includes(especialidade.toLowerCase()),
        );
      }
    }

    return resultado;
  }

  buscarPorId(id: number) {
    const profissional = this.profissionais.find((p) => p.id === id);

    if (!profissional) {
      throw new NotFoundException('Profissional não encontrado');
    }

    return profissional;
  }

  criar(dados: CreateProfissionalDto) {
    const registroExiste = this.profissionais.find(
      (p) =>
        p.registryCard.toLowerCase() ===
        dados.registryCard.toLowerCase(),
    );

    if (registroExiste) {
      throw new ConflictException(
        'Já existe um profissional cadastrado com este registro profissional na clínica.',
      );
    }

    const servicesIds = dados.servicesIds ?? [];

    const servicos = servicesIds.map((id) =>
      this.servicosService.buscarPorId(id),
    );

    const novoId =
      this.profissionais.length > 0
        ? Math.max(...this.profissionais.map((p) => p.id)) + 1
        : 1;

    const novoProfissional: Profissional = {
      id: novoId,
      name: dados.name,
      email: dados.email,
      phone: dados.phone,
      registryCard: dados.registryCard,
      specialty: dados.specialty,
      servicesIds,
      ativo: true,
    };

    this.profissionais.push(novoProfissional);

    return {
      ...novoProfissional,
      servicos,
    };
  }

  criarAPartirDoUsuario(usuario: UsuarioSemSenha) {
    const novoId =
      this.profissionais.length > 0
        ? Math.max(...this.profissionais.map((p) => p.id)) + 1
        : 1;

    const profissional: Profissional = {
      id: novoId,
      name: usuario.nome,
      email: usuario.email,
      phone: '',
      registryCard: '',
      specialty: '',
      servicesIds: [],
      ativo: true,
    };

    this.profissionais.push(profissional);

    return profissional;
  }

  atualizarParcial(id: number, dados: UpdateProfissionalDto) {
    const profissional = this.buscarPorId(id);

    if (dados.servicesIds !== undefined) {
      dados.servicesIds.forEach((servicoId) => {
        this.servicosService.buscarPorId(servicoId);
      });
    }

    const atualizado = {
      ...profissional,
      ...dados,
    };

    this.profissionais = this.profissionais.map((p) =>
      p.id === id ? atualizado : p,
    );

    return atualizado;
  }

  remover(id: number) {
    const existe = this.profissionais.some((p) => p.id === id);

    if (!existe) {
      throw new NotFoundException('Profissional não encontrado');
    }

    this.profissionais = this.profissionais.filter(
      (p) => p.id !== id,
    );

    return {
      mensagem: `Profissional ${id} removido com sucesso`,
    };
  }
}
