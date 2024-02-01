# TYPE PETS

Is a API Rest make to adoction animals in any organization register on api.

You is can be a user or admin, depending of your context.

**USER** can addopet PET's if him is avaible in moment, he can to search for pets in any city or for your characteristcs.

**ORG** can create PETS, Update Characteriscs and he status.

# Tecnologias:

- Node.js
- TypeScript
- Fastify
- Vitest
- Prisma
- zod
- pg

# Start Application.

Install packages:
```cmd
npm install
```

Docker Image: (Docker Previously install) configurado no arquivo docker-compose

```javascript
docker compose up -d
```
Up migrations:

```cmd
npx prisma migrate dev
```



