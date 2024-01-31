import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findByCity } from './find-by-city'
import { searchByCharacterPets } from './search-many-by-characteristics'
import { searchByOrgIdPets } from './search-many-by-org-id'
import { adopt } from './adopt'
import { verifyJwt } from '@/http/middlewares/verift-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/pet', { onRequest: [verifyUserRole('ADMIN')] }, create)

  app.get('/pets/:city', findByCity)
  app.get('/pets/Characteristics/:characteristics', searchByCharacterPets)
  app.get('/pets/orgId/:orgId', searchByOrgIdPets)

  app.put('/pets/adopt', adopt)
}
