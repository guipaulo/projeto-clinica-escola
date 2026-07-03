import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

// Seguindo o padrão do professor de definir o tipo no próprio service por enquanto
type Paciente = {
  id: number;
  nome: string;
  telefone: string;
  email?: string;
  ativo: boolean;
};

@Injectable()
export class PacientesService {
  private pacientes: Paciente[] = [
    { id: 1, nome: 'João Silva', telefone: '11999999999', email: 'joao@email.com', ativo: true },
    { id: 2, nome: 'Maria Souza', telefone: '11888888888', ativo: true },
  ];

  listar() {
    return [...this.pacientes];
  }

  buscarPorId(id: number) {
    const paciente = this.pacientes.find((p) => p.id === id);

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    return paciente;
  }

  criar(dados: CreatePacienteDto) {
    const novoId =
      this.pacientes.length > 0
        ? Math.max(...this.pacientes.map((p) => p.id)) + 1
        : 1;

    const novoPaciente: Paciente = { id: novoId, ...dados };
    this.pacientes.push(novoPaciente);
    return novoPaciente;
  }

  atualizarParcial(id: number, dados: UpdatePacienteDto) {
    const paciente = this.buscarPorId(id);
    const atualizado = { ...paciente, ...dados };

    this.pacientes = this.pacientes.map((p) => (p.id === id ? atualizado : p));
    return atualizado;
  }

  remover(id: number) {
    const existe = this.pacientes.some((p) => p.id === id);

    if (!existe) {
      throw new NotFoundException('Paciente não encontrado');
    }

    this.pacientes = this.pacientes.filter((p) => p.id !== id);
    return { mensagem: `Paciente ${id} removido com sucesso` };
  }
}