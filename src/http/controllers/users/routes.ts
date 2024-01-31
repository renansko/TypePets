import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findByEmail } from './find-by-city'
import { userToAdmin } from './user-to-admin'
import { autheticate } from './authenticate'
import { verifyJwt } from '@/http/middlewares/verift-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', create)

  app.post('/user/admin', { onRequest: [verifyJwt] }, userToAdmin)

  app.post('/user/sesson', autheticate)

  app.get('/user/email', { onRequest: [verifyJwt] }, findByEmail)
}
