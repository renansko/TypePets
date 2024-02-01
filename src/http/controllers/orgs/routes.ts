import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findByCity } from './findByCity'
import { findById } from './findById'
import { autheticate } from './authenticate'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { verifyJwt } from '@/http/middlewares/verift-jwt'

export async function orgRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/org/register', create)
  app.post('/org/sesson', { onRequest: [verifyUserRole('ADMIN')] }, autheticate)

  app.get('/findOrgByCity/:city', findByCity)
  app.get('/findOrgById/:id', findById)
}
