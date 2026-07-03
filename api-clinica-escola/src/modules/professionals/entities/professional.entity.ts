export class Professional {
  // Esta classe representa o modelo de dados de um Profissional da saúde no sistema.
  // Eu criei a estrutura em inglês seguindo estritamente a modelagem padrão acordada pelo grupo.
  id!: string;
  name!: string;
  email!: string;
  phone!: string;
  registryCard!: string;
  servicesIds!: string[]; // Guarda a lista de IDs de serviços associados a ele
  createdAt!: Date;
  updatedAt!: Date;
}