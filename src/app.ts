import fastify from 'fastify'
import { orgRoutes } from './http/controllers/orgs/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { petsRoutes } from './http/controllers/pets/routes'
import { userRoutes } from './http/controllers/users/routes'

export const app = fastify()

app.register(orgRoutes)
app.register(petsRoutes)
app.register(userRoutes)

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
