import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verift-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function petDetailsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/petDetails', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
