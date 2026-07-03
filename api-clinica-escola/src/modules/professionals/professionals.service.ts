import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { Professional } from './entities/professional.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProfessionalsService {
  // Criei este array em memória para gerenciar temporariamente os profissionais da clínica
  private professionals: Professional[] = [];

  criar(createProfessionalDto: CreateProfessionalDto) {
    // Regra de negócio: impeço o cadastro se o e-mail do profissional já existir no sistema
    const emailExiste = this.professionals.find(p => p.email === createProfessionalDto.email);
    
    if (emailExiste) {
      throw new ConflictException('Este e-mail de profissional já está cadastrado.');
    }

    const novoProfissional: Professional = {
      id: uuidv4(),
      ...createProfessionalDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.professionals.push(novoProfissional);
    return novoProfissional;
  }

  listarTodos() {
    return this.professionals;
  }

  buscarUm(id: string) {
    const profissional = this.professionals.find(p => p.id === id);
    if (!profissional) {
      throw new NotFoundException('Profissional não encontrado.');
    }
    return profissional;
  }

  atualizar(id: string, updateProfessionalDto: any) {
    const index = this.professionals.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new NotFoundException('Profissional não encontrado.');
    }

    this.professionals[index] = {
      ...this.professionals[index],
      ...updateProfessionalDto,
      updatedAt: new Date(),
    };

    return this.professionals[index];
  }

  remover(id: string) {
    const index = this.professionals.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new NotFoundException('Profissional não encontrado.');
    }

    const removido = this.professionals[index];
    this.professionals.splice(index, 1);
    
    return removido;
  }
}