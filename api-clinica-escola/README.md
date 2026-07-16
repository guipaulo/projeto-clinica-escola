<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## 📋 Divisão de Tarefas e Acompanhamento

Para garantir a organização e o fluxo de entregas, dividimos as responsabilidades do sistema de acordo com as funcionalidades principais (módulos). O progresso foi acompanhado através de reuniões e divisões de sprints no GitHub.

| Integrante | Módulo / Responsabilidade | Funcionalidades Desenvolvidas | Status |
| :--- | :--- | :--- | :--- |
| **🔑 Ingridy Luzia** | **Autenticação, Usuários & Segurança** | - Cadastro de usuários<br>- Login com JWT e geração de tokens<br>- Perfis de acesso (admin, profissional, recepção)<br>- Guards e autorização baseada em papéis (roles) | ✅ Concluído |
| **🩺 Nicole Gabriel** | **Alunos & Profissionais** | - CRUD completo de Alunos<br>- CRUD completo de Profissionais<br>- Relacionamento entre profissionais e serviços | ✅ Concluído |
| **📅 José Henrique** | **Serviços & Horários** | - Cadastro e gerenciamento de Serviços (entidade `Service`)<br>- Agenda e horários disponíveis dos profissionais (entidade `Schedule`) | ✅ Concluído |
| **🎯 Paulo Guilherme** | **Atendimentos (Core do Sistema)** | - Criação e fluxo de Agendamentos<br>- Validação de conflitos de horário<br>- Confirmação e cancelamento de atendimentos | ✅ Concluído |

---

## 🌿 Estrutura de Branches

Para manter o desenvolvimento organizado e evitar conflitos diretos na linha de produção, o grupo utilizou o modelo de ramificação (*Feature Branches*). Cada integrante trabalhou em sua própria branch antes da integração final na ramificação principal:

*   **`main`**: Código estável, integrado e homologado do projeto.
*   **`nicoletsi`** (Nicole Gabriel):
    *   **Backend:** Desenvolveu os CRUDs de `alunos` e `profissionais`. Liderou a refatoração para migrar a arquitetura de "pacientes" para "alunos" (ajustando DTOs e entidades).
    *   **Integração:** Limpou redundâncias de status nos módulos de `horarios` e `servicos` e resolveu conflitos críticos de mesclagem no `app.module.ts` e no gerenciador de pacotes.
*   **`ingridy`** (Ingridy Luzia):
    *   **Backend:** Implementou os módulos de `autenticacao` e `usuarios` com criptografia Bcrypt (`gerar-hashes.ts`). Estruturou o ambiente de desenvolvimento usando Docker (`Dockerfile` e `docker-compose.yml`).
    *   **Frontend:** Desenvolveu a interface web de login na pasta `cliente-auth` utilizando HTML, CSS e JS puro.
*   **`jose`** (José Henrique):
    *   **Backend:** Desenvolveu os módulos de `servicos` e `horarios`. Implementou métodos de busca por ID (`buscarPorId`) e estabilizou o fluxo inicial de agendas integrando tudo ao módulo principal.
*   **`guipaulo`** (Paulo Guilherme):
    *   **Backend:** Desenvolveu o módulo de `atendimentos` e a lógica de filtros de busca (`filtro-atendimento.dto.ts` com `@Query`). Ajustou retornos HTTP e trabalhou na refatoração e integração geral dos módulos da API no fechamento do projeto.

---

## 🚀 Demonstração do Projeto (Deploy)

O sistema completo (Frontend integrado ao Backend) foi publicado para demonstração e pode ser testado nos seguintes endereços:

*   **💻 Interface Web (Frontend):** [Clique aqui para acessar o sistema](https://link-do-seu-frontend-no-vercel-ou-netlify.com)
*   **🔌 API Publicada (Backend):** [Clique aqui para acessar a API](https://projeto-clinica-escola.onrender.com)
*   **📖 Documentação dos Endpoints (Swagger):** [Clique aqui para ver a documentação](https://projeto-clinica-escola.onrender.com/api)