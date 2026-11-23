# API de Agendamento de Consultórios

API REST para agendamento de consultas em consultórios, com autenticação JWT e controle de acesso por perfil (administrador, médico e paciente).

## Tecnologias

- Node.js e Express 5
- Prisma 5 (ORM) e MySQL
- JWT (jsonwebtoken) e bcrypt para autenticação e senhas
- Zod 4 para validação dos dados de entrada
- Nodemon para desenvolvimento

## Funcionalidades

- Login único com três perfis: **ADMIN**, **MEDICO** e **PACIENTE**
- Cadastro de especialidades e médicos (somente admin)
- Cadastro de pacientes aberto (o próprio paciente se cadastra)
- Marcação, listagem, cancelamento e remarcação de consultas
- Consulta de horários livres de um médico em um dia
- Validação de corpo, query e parâmetros da requisição
- Tratamento centralizado de erros, sem vazar detalhes internos

## Como rodar na sua máquina

### Pré-requisitos

- Node.js instalado
- MySQL rodando localmente

### Passo a passo

1. Clone o repositório e entre na pasta:

```bash
git clone https://github.com/Felipebuzo/api-agendamento-consultorio.git
cd api-agendamento-consultorio
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz com as variáveis abaixo (troque pelos seus valores):

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/agendamento_consultorio"
JWT_SECRET="uma-chave-secreta-longa-e-dificil-de-adivinhar"
PORT=3333
```

4. Crie as tabelas no banco:

```bash
npx prisma migrate dev
```

5. Ligue a API:

```bash
npm run dev
```

A API fica disponível em `http://localhost:3333`.

### Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Liga a API e reinicia sozinha ao salvar arquivos (nodemon) |
| `npm start` | Liga a API do jeito simples |

## Rotas

Todas as rotas ficam sob o prefixo `/api`. As rotas protegidas exigem o header `Authorization: Bearer SEU_TOKEN`.

| Método | Rota | Quem pode |
|---|---|---|
| POST | `/api/login` | Público |
| POST | `/api/cadastro` | Admin |
| POST | `/api/especialidades` | Admin |
| GET | `/api/especialidades` e `/api/especialidades/:id` | Qualquer usuário logado |
| DELETE | `/api/especialidades/:id` | Admin |
| POST | `/api/medicos` | Admin |
| GET | `/api/medicos` | Qualquer usuário logado |
| POST | `/api/pacientes` | Público |
| GET | `/api/pacientes` | Admin |
| POST | `/api/consultas` | Admin e paciente |
| GET | `/api/consultas` | Qualquer usuário logado (cada um vê o que lhe pertence) |
| GET | `/api/horarios-livres?medicoId=1&data=2026-12-15` | Qualquer usuário logado |
| PATCH | `/api/consultas/:id/cancelar` | Dono da consulta ou admin |
| PATCH | `/api/consultas/:id/remarcar` | Dono da consulta ou admin |

## Regras de negócio

- Toda consulta dura **30 minutos**, em blocos de 30 minutos, entre **8h e 18h**.
- A data da consulta precisa estar no futuro.
- Um médico não pode ter duas consultas agendadas na mesma janela de horário.
- Cancelar **não apaga** a consulta: ela passa para o status `CANCELADA` e o horário volta a ficar livre.
- Remarcar refaz a checagem de conflito, ignorando a própria consulta.
- O paciente vê só as próprias consultas, o médico vê só a própria agenda e o admin vê todas.
- Os horários são interpretados como horário de Brasília e guardados em UTC no banco.

## Segurança

- Senhas guardadas com hash (bcrypt) e token JWT com validade de 8 horas.
- O login responde com uma mensagem genérica para não revelar se o email existe.
- Ordem das verificações em cada rota: autenticação, permissão, validação e só então a regra de negócio.
- Erros inesperados devolvem apenas "Erro interno do servidor"; o detalhe fica no terminal.

## Autor

Felipe Goncalves Buzo - [GitHub](https://github.com/Felipebuzo)