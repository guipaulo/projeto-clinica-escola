import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProfissionalDto } from './dto/create-profissional.dto';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';
import { FiltroProfissionalDto } from './dto/filtro-profissional.dto';
// Definição do tipo no próprio service
type Profissional = {
  id: number;
  name: string;
  email: string;
  phone: string;
  registryCard: string;
  specialty: string;
  servicesIds: number[];
  ativo?: boolean;
};

// Serviço para gerenciar os profissionais na clínica-escola, incluindo operações de CRUD
@Injectable()
export class ProfissionaisService {
  // 2. Atualização dos dados em memória para o formato com filtro
  private profissionais: Profissional[] = [
    { id: 1, name: 'Dra. Ana', email: 'ana@email.com', phone: '1199999999', registryCard: 'CRM123', specialty: 'fisioterapia', servicesIds: [1, 2], ativo: true },
    { id: 2, name: 'Dr. Carlos', email: 'carlos@email.com', phone: '1188888888', registryCard: 'CRM456', specialty: 'pedagogia', servicesIds: [3], ativo: true },
    { id: 3, name: 'Dra. Maria', email: 'maria@email.com', phone: '1177777777', registryCard: 'CRM789', specialty: 'psicologia', servicesIds: [4, 5], ativo: true },
  ];

  // Controlador para listar todos os profissionais, utilizando o serviço de profissionais
  listar(filtros?: FiltroProfissionalDto) {
    let resultado = [...this.profissionais];

    if (filtros) {
      const { nome, especialidade } = filtros;

      if (nome) {
        resultado = resultado.filter((p) =>
          p.name.toLowerCase().includes(nome.toLowerCase())
        );
      }

      if (especialidade) {
        // Mudamos p.especialidade para p.specialty!
        resultado = resultado.filter((p) =>
          p.specialty.toLowerCase().includes(especialidade.toLowerCase())
        );
      }
    }

    return resultado;
  }

  // Controlador para buscar um profissional pelo ID, utilizando o serviço de profissionais
  buscarPorId(id: number) {
    const profissional = this.profissionais.find((p) => p.id === id);

    if (!profissional) {
      throw new NotFoundException('Profissional não encontrado');
    }

    return profissional;
  }

  // Controlador para criar um novo profissional, utilizando o serviço de profissionais
  criar(dados: CreateProfissionalDto) {
    const nomeExiste = this.profissionais.find(
      (p) => p.name.toLowerCase() === dados.name.toLowerCase()
    );

    if (nomeExiste) {
      throw new ConflictException('Já existe um profissional cadastrado com este nome na clínica.');
    }

    const novoId =
      this.profissionais.length > 0
        ? Math.max(...this.profissionais.map((p) => p.id)) + 1
        : 1;

    // 1. Separa servicesIds e especialidade do resto dos dados
    const { servicesIds, especialidade, ...restoDosDados } = dados as any;

    // 2. Monta o objeto traduzindo especialidade para specialty
    const novoProfissional: Profissional = {
      id: novoId,
      servicesIds: servicesIds || [], // Se não vier nada, fica um array vazio
      specialty: especialidade,
      ...restoDosDados
    };

    this.profissionais.push(novoProfissional);
    return novoProfissional;
  }

  // Controlador para atualizar parcialmente os dados de um profissional pelo ID, utilizando o serviço de profissionais
  atualizarParcial(id: number, dados: UpdateProfissionalDto) {
    const profissional = this.buscarPorId(id);
    const atualizado = { ...profissional, ...dados };

    this.profissionais = this.profissionais.map((p) => (p.id === id ? atualizado : p));
    return atualizado;
  }

  // Controlador para remover um profissional pelo ID, utilizando o serviço de profissionais
  remover(id: number) {
    const existe = this.profissionais.some((p) => p.id === id);

    if (!existe) {
      throw new NotFoundException('Profissional não encontrado');
    }

    this.profissionais = this.profissionais.filter((p) => p.id !== id);
    return { mensagem: `Profissional ${id} removido com sucesso` };
  }
}