import { Injectable, NotFoundException } from '@nestjs/common';
import { Servico } from '../entidades/servico.entidade';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServiceDto } from './dto/update-servico.dto';

@Injectable()
export class ServicosService {
    private servicos: Servico[] = [
        {
            id: 1,
            "nome": "Sessão de Fisioterapia",
            "descricao": "Sessão de fisioterapia para reabilitação e fortalecimento muscular.",
            "duracao": 70,
        },
        {
            id: 2,
            "nome": "Avaliação Psicológica",
            "descricao": "Primeira consulta de triagem para levantamento de histórico do paciente.",
            "duracao": 60,
        },
        {
            id: 3,
            "nome": "Acompanhamento e Orientação Nutricional",
            "descricao": "Acompanhamento contínuo e orientação sobre alimentação saudável.",
            "duracao": 40,
        }
    ]

    listarServicos() {
        return this.servicos;
    }

    cadastrarServico(createServicoDto: CreateServicoDto) {
        const novoServico: Servico = {
            id: this.servicos.length + 1,
            nome: createServicoDto.nome,
            descricao: createServicoDto.descricao,
            duracao: createServicoDto.duracao,
        };

        this.servicos.push(novoServico);
        return novoServico;
    }

    atualizarServico(id: number, body: UpdateServiceDto) {
        const servico = this.servicos.find(s => s.id === id);

        if (!servico) {
            throw new NotFoundException('Serviço com ID ${id} não encontrado.');
        }

        const camposAtualizados = Object.entries(body).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key as keyof UpdateServiceDto] = value;
            }
            return acc;
        }, {} as Partial<UpdateServiceDto>);

        const servicoAtualizado: Servico = { ...servico, ...camposAtualizados };
        this.servicos = this.servicos.map((s) => s.id === id ? servicoAtualizado : s);

        return servicoAtualizado;
    }

    deletarServico(id: number) {
        this.servicos = this.servicos.filter(s => s.id !== id);
        return 'Serviço deletado com sucesso.';
    }
}
