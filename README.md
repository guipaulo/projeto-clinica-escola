# 📚 Projeto Clínica-Escola

Projeto final da disciplina de Desenvolvimento Web Back-end.

---

## 🧩 Problema

Desenvolver uma **agenda de atendimentos para uma clínica-escola**, permitindo o gerenciamento de:

- Profissionais
- Pacientes
- Serviços
- Horários
- Atendimentos

O sistema deve lidar com:

- Conflitos de agenda
- Confirmação e cancelamento de atendimentos
- Regras de disponibilidade
- Possíveis integrações externas (ex: envio de lembretes e consulta de endereços)

⚠️ Observação: o projeto não utiliza dados reais ou sensíveis de saúde.

---

## 👥 Integrantes

<div>
  <a href="https://github.com/IngridyCandido">Ingridy Luzia Silva Candido</a><br/>
  <a href="https://github.com/zehelll">Jose Henrique Aviz de Farias</a><br/>
  <a href="https://github.com/nicoletsi">Nicole Gabriel Lucena de Carvalho</a><br/>
  <a href="https://github.com/guipaulo">Paulo Guilherme Silva de Araújo</a>
</div>

---

## 🏗️ Arquitetura

O projeto segue a arquitetura modular do **NestJS**, com separação por responsabilidades:

- Módulos independentes por domínio (ex: usuários, autenticação, agendamentos)
- Controllers responsáveis pelas rotas HTTP
- Services contendo a regra de negócio
- Guards para controle de autenticação e autorização

---

## 🛠️ Tecnologias

- Node.js
- NestJS
- TypeScript
- Passport.js
- Passport Local Strategy
- class-validator
- class-transformer

---

## ▶️ Como executar o projeto

1. Clonar o repositório
```bash
git clone https://github.com/seu-repositorio/api-clinica-escola.git
```
1. Clonar o repositório
```bash
git clone https://github.com/seu-repositorio/api-clinica-escola.git
```
2. Entrar na pasta
```bash
cd api-clinica-escola
```
3. Instalar dependências
```bash
npm install
```
4. Rodar o projeto
```bash
npm run start:dev

A API estará disponível em:

http://localhost:3000
```
#Variáveis de ambiente 
PORT=3000
JWT_SECRET=sua_chave_secreta
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=clinica_escola

#Decisões técnicas
NestJS: escolhido pela arquitetura escalável e modular
Passport: padrão consolidado para autenticação
class-validator: validação declarativa e integrada ao NestJS
Modularização: separação entre modulos para organização e manutenção
Guards: controle de acesso desacoplado da lógica de negócio
