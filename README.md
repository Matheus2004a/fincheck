# Fincheck

Sistema de controle de finanças pessoais para gerenciar todas as suas transações bancárias de receitas e despesas.

## Screenshots

![Thumbnail](./.github/thumbnail.png)

## Funcionalidades

- Crud de categorias, contas bancárias e transações;
- Traduções dos textos em pt-BR e en;
- Filtragem das transações de acordo com seu tipo (entrada ou despesa), mês, ano e à conta bancária pertencente;
- Atualização do balanço total de cada conta bancária de acordo com o valor das transações feitas.

## Stacks

### Front-End

<div style="display:flex; gap:5px">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" height="40">
  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="40" height="40">
  
  <img src="https://imgs.search.brave.com/qYwS_LG8_ij9oz8f67YNKZwGh3NOsIIlX4JZPwSYfq4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9iZXN0/b2Zqcy5vcmcvbG9n/b3MvYXhpb3MuZGFy/ay5zdmc.svg" width="40" height="40">

  <img src="https://imgs.search.brave.com/7Gu3pIrFLMwCYzO-PRXZPHLo3w1bD_0qddo4UvGcFjI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yYXcu/Z2l0aHVidXNlcmNv/bnRlbnQuY29tL2Nv/bGluaGFja3Mvem9k/L0hFQUQvbG9nby5z/dmc.svg" width="40" height="40">

  <img src="https://imgs.search.brave.com/0hxH8_axucD-fm3OG5KHRFmp2lbjac7Bm6jvnOR8olE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly92ZWN0/b3J3aWtpLmNvbS9p/bWFnZXMvU2tqMGxf/X3JlYWN0LXF1ZXJ5/LWljb24uc3Zn.svg" width="40" height="40">
</div>

### Back-End

<div style="display:flex; gap:5px">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-plain.svg" width="40" height="40">

  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg" width="40" height="40">

  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg" width="40" height="40" />

  <img src="https://imgs.search.brave.com/F2Qklu6s-ZvvnrhXSSBfbise7jM-iGBB8kOrsXqoBd0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wcmlz/bWFsZW5zLnZlcmNl/bC5hcHAvaGVhZGVy/L3ByaXNtYS1sb2dv/LnN2Zw.svg" width="40" height="40" />  
</div>

## Rodando o Front-End

- Entre na pasta `/frontend`;
- Instale todas as dependências;

```bash
npm install
```

- Rode o projeto no browser.

```bash
npm run dev
```

## Rodando o Back-End

- Entre na pasta `/backend`;
- Instale todas as dependências;

```bash
npm install
```

- Inicie a api localmente.

```bash
npm run start:dev
```

- Caso queira visualizar o banco de dados na GUI do Prisma.

```bash
  npx prisma studio
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu `.env`

Frontend

`VITE_API_URL='http://localhost:3000'`

Backend

`DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"`

`JWT_SECRET="your_secret_key"`

