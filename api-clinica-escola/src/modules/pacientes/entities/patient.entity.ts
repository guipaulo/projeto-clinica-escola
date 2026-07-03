export class Patient {
  // Esta é a classe que representa o modelo de dados do Paciente no meu sistema.
  // Eu defini os atributos principais que o grupo combinou na modelagem oficial.
  id!: string;
  name!: string;
  email!: string;
  phone!: string;
  document!: string;
  avatarUrl?: string;
  createdAt!: Date; // Guardará o dia e hora exatos em que eu registrei esse paciente
  updatedAt!: Date; // Será atualizado automaticamente sempre que eu alterar algum dado
}