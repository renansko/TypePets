import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findByCity } from './find-by-city'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pet', create)

  app.get('/petsCity/:city', findByCity)
}
