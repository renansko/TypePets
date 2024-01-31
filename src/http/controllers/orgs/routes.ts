import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findByCity } from './findByCity'
import { findById } from './findById'
import { autheticate } from './authenticate'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/org/register', create)
  app.post('/org/sesson', autheticate)

  app.get('/findOrgByCity/:city', findByCity)
  app.get('/findOrgById/:id', findById)
}
