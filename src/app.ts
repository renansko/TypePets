import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { orgRoutes } from './http/controllers/orgs/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { petsRoutes } from './http/controllers/pets/routes'
import { userRoutes } from './http/controllers/users/routes'
import { petDetailsRoutes } from './http/controllers/pets/petDetails/routes'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(orgRoutes)
app.register(petsRoutes)
app.register(userRoutes)
app.register(petDetailsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Santry
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
