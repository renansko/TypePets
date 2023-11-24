import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findByCity } from './findByCity'
import { findById } from './findById'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/org-register', create)

  app.get('/findOrgByCity/:city', findByCity)
  app.get('/findOrgById/:id', findById)
}
