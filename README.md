###projeto-clínica-escola
Projeto final da disciplina Desenvolvimento Web Back-end

###Problema: Desenvolver uma agenda de atendimentos para clínica-escola.
Cadastro de profissionais, serviços, horários, pacientes e atendimentos, com regras para conflito, confirmação e cancelamento. A integração pode consultar endereços ou enviar lembretes, sem utilizar dados reais ou sensíveis de saúde.

###Integrantes: 
<div>
  <a href="https://github.com/IngridyCandido">Ingridy Luzia Silva Cândido</a>
  <a href="https://github.com/zehelll">Jose Henrique Aviz de Farias</a>
  <a href="https://github.com/nicoletsi">Nicole Gabriel Lucena de Carvalho</a>
  <a href="https://github.com/guipaulo">Paulo Guilherme Silva de Araújo</a>
</div>

#Arquitetura
O projeto segue a arquitetura modular do NestJS:


#Tecnologias
- Node.js
- NestJS
- TypeScript
- Passport.js
- Passport Local Strategy
- class-validator
- class-transformer

#Instruções de execução

1. Clonar o repositório

git clone https://github.com/seu-repositorio/api-clinica-escola.git

2. Entrar na pasta

cd api-clinica-escola

3. Instalar dependências

npm install

4. Rodar o projeto
npm run start:dev

A API estará disponível em:

http://localhost:3000

#Variáveis de ambiente 


#Decisões técnicas
NestJS: escolhido pela arquitetura escalável e modular
Passport: padrão consolidado para autenticação
class-validator: validação declarativa e integrada ao NestJS
Modularização: separação entre modulos para organização e manutenção
Guards: controle de acesso desacoplado da lógica de negócio
