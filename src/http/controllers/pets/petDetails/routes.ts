import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function petDetailsRoutes(app: FastifyInstance) {
  app.post('/petDetails', create)
}
