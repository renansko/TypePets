import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findByEmail } from './find-by-city'
import { userToAdmin } from './user-to-admin'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', create)

  app.post('/user/admin', userToAdmin)

  app.get('/user/email', findByEmail)
}
