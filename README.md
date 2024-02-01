# TYPE PETS

![NodeJS](https://github.com/renansko/TypePets/edit/main/LICENSE)

#

Is a API Rest make to adoction animals in any organization register on api.

You is can be a user or admin, depending of your context.

**USER** can addopet PET's if him is avaible in moment, he can to search for pets in any city or for your characteristcs.

**ORG** can create PETS, Update Characteriscs and he status.

## Tecnologias

- Node.js
- TypeScript
- Fastify
- Vitest
- Prisma
- zod
- pg

## Start Application

Clonar repositorio:

```bash
git clone https://github.com/renansko/TypePets.git
```

Install packages:

```bash

npm install
```

Docker Image: (Docker Previously install) configurado no arquivo docker-compose

```bash
docker compose up -d
```

Up migrations:

```bash
npx prisma migrate dev
```

## Diagrama banco de dados:

h
![Diagrama](src\img\Pets.jpeg)