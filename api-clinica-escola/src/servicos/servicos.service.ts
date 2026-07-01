import { Injectable } from '@nestjs/common';
import { Servico } from '../entidades/servico.entidade';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServiceDto } from './dto/update-servico.dto';

@Injectable()
export class ServicosService {
    private servicos: Servico[] = [
        {
            id: 1,
            "nome": "Consulta de Fisioterapia Traumato-Ortopédica",
            "descricao": "Atendimento supervisionado para reabilitação de lesões musculares e fraturas.",
            "duracaoEmMinutos": 50,
            "ativo": true
        },
        {
            id: 2,
            "nome": "Avaliação Psicológica Infantil",
            "descricao": "Aplicação de testes e anamnese com crianças da comunidade.",
            "duracaoEmMinutos": 60,
            "ativo": true
        },
        {
            id: 3,
            "nome": "Limpeza de Pele Profunda",
            "duracaoEmMinutos": 90,
            "ativo": false
        }
    ]

    async cadastrarServico(createServicoDto: CreateServicoDto): Promise<Servico> {
        const novoServico: Servico = {
            id: this.servicos.length + 1,
            nome: createServicoDto.nome,
            descricao: createServicoDto.descricao,
            duracaoEmMinutos: createServicoDto.duracaoEmMinutos,
            ativo: true,
        };
        this.servicos.push(novoServico);        
        return novoServico;
    }

    async listarServicos(): Promise<Servico[]> {
        if (this.servicos.length === 0) {
            console.log('nao ha nenhum serviço cadastrado');
        }
        return this.servicos;
    }

    //logica para atualizar um serviço específico usando put
    async atualizarServico(id: number, body: UpdateServiceDto): Promise<Servico | undefined> {
        const servicoId = id;
        const servico = this.servicos.find(s => s.id === servicoId);
        if (servico) {
            Object.assign(servico, body);
            return servico;
        }
    }

    async deletarServico(id: number): Promise<void> {
        const servicoId = id;
        this.servicos = this.servicos.filter(s => s.id !== servicoId);
    }
}
